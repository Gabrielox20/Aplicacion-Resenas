import React from 'react';
import '../styles/Post.css';

const PostContent = ({ post }) => {
  return (
    <div className="post-content-container">
      <img className="post-image" src={`${process.env.REACT_APP_IMG_URL}/${post.image_path.split('/').pop()}`} alt="Post" />
      <h1>{post.text}</h1>
      <div>Calificacion: {post.rating}</div>
    </div>
    

  );
};

export default PostContent;
