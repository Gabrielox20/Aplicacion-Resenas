const express = require('express');
const pool = require('../server');


const router = express.Router();


// Middleware
router.use(express.json());

// Endpoint para agregar un comentario
router.post('/comments', async (req, res) => {
  const { post_id, username, comment_text, rating } = req.body;

  if (!post_id || !username || !comment_text || rating == null) {
    return res.status(400).send('All fields are required.');
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).send('Rating must be between 0 and 5.');
  }

  try {
    // Insertar el comentario en la base de datos
    const result = await pool.query(
      'INSERT INTO comments (post_id, username, comment_text, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [post_id, username, comment_text, rating]
    );

    // Actualizar la calificación promedio del post
    await pool.query(
      `UPDATE posts
       SET rating = (
         SELECT AVG(rating)
         FROM comments
         WHERE post_id = $1
       )
       WHERE id = $1`,
      [post_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving comment to the database.');
  }
});

// Endpoint para obtener los comentarios de un post
router.get('/comments/:post_id', async (req, res) => {
  const { post_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM comments WHERE post_id = $1',
      [post_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving comments from the database.');
  }
});

// Endpoint para actualizar un comentario
router.put('/comment/:id', async (req, res) => {
  const { id } = req.params;
  const { comment_text, rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res.status(400).send('Rating must be between 0 and 5.');
  }

  try {
    const result = await pool.query(
      'UPDATE comments SET comment_text = $1, rating = $2 WHERE id = $3 RETURNING *',
      [comment_text, rating, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Comment not found.');
    }

    const post_id = result.rows[0].post_id;
    await pool.query(
      `UPDATE posts
       SET rating = (
         SELECT AVG(rating)
         FROM comments
         WHERE post_id = $1
       )
       WHERE id = $1`,
      [post_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating comment in the database.');
  }
});

// Endpoint para eliminar un comentario
router.delete('/comment/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Comment not found.');
    }

    const post_id = result.rows[0].post_id;
    await pool.query(
      `UPDATE posts
       SET rating = (
         SELECT AVG(rating)
         FROM comments
         WHERE post_id = $1
       )
       WHERE id = $1`,
      [post_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting comment from the database.');
  }
});

module.exports = router;
