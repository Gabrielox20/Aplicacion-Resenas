import React from 'react';
import '../styles/Post.css';

const PostContent = ({ post }) => {
  return (
    <div className="post-content-container">
      <img className="post-image" src={`http://localhost:5000/uploads/${post.image_path.split('/').pop()}`} alt="Post" />
      <h1>{post.text}</h1>
      <div>Rating: {post.rating}</div>
    </div>
  );
};

export default PostContent;
