const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  db_port: process.env.DB_PORT,
});

module.exports = pool;

const port = process.env.BACKEND_PORT;
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// Usar CORS
app.use(cors());

// Usar JSON y File Upload Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas de posts y comments
app.use('/api', postsRouter);
app.use('/api', commentsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
