const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const pool = require('../server');

const router = express.Router();


// Middleware
router.use(express.json());
router.use(fileUpload());

// Endpoint para subir una publicación
router.post('/posts', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const postText = req.body.text;
  const postImage = req.files.image;

  if (!postText) {
    return res.status(400).send('Post text is required.');
  }

  const allowedExtensions = /png|jpeg|jpg/;
  const extName = path.extname(postImage.name).toLowerCase();
  if (!allowedExtensions.test(extName)) {
    return res.status(400).send('Only images are allowed (png, jpeg, jpg).');
  }

  const uploadPath = path.join(__dirname, '../uploads', postImage.name);

  // Mover el archivo a la carpeta de uploads
  postImage.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      const result = await pool.query(
        'INSERT INTO posts (text, image_path) VALUES ($1, $2) RETURNING *',
        [postText, uploadPath]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving post to the database.');
    }
  });
});

// Endpoint para obtener todas las publicaciones
router.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving posts from the database.');
  }
});

// Endpoint para obtener una publicación por ID
router.get('/post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Post not found.');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving post from the database.');
  }
});

// Endpoint para actualizar una publicación
router.put('/post/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const result = await pool.query(
      'UPDATE posts SET text = $1 WHERE id = $2 RETURNING *',
      [text, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Post not found.');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating post in the database.');
  }
});

// Endpoint para eliminar una publicación
router.delete('/post/:id', async (req, res) => {
  const { id } = req.params;
  try{
    pool.query('DELETE FROM comments WHERE post_id = $1 RETURNING *', [id]);


    try {
      const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).send('Post not found.');
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting post from the database.');
    }

  } catch{

  }

});

module.exports = router;
