const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

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
