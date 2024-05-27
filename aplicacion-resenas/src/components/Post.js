import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Post.css';

const Post = ({ post, onPostDeleted, onEdit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/post/${post.id}`);
      onPostDeleted(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post-container">
      <div className="post-content" onClick={handleClick}>
        <img className="post-image" src={`${process.env.REACT_APP_IMG_URL}/${post.image_path.split('/').pop()}`} alt="Post" />
        <div className="post-title">{post.text}</div>
        <div className="post-rating">Calificacion: {post.rating}</div>
      </div>
      <div className="post-actions">
        <button onClick={() => onEdit(post)} className="edit-button">
          ✏️
        </button>
        <button onClick={handleDelete} className="delete-button">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Post;
