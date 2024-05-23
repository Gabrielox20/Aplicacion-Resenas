import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.text}</h2>
      <img src={`http://localhost:5000/uploads/${post.image_path}`} alt="Post" style={{ maxWidth: '100%' }} />
      <p>Rating: {post.rating}</p>
    </div>
  );
};

export default Post;
