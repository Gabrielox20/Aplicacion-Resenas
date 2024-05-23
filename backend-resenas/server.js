const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// Usar CORS
app.use(cors());

// Usar las rutas de posts y comments
app.use('/api', postsRouter);
app.use('/api', commentsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
