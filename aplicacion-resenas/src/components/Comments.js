import React from 'react';
import axios from 'axios';
import '../styles/Post.css';

const Comments = ({ comments, onCommentDeleted }) => {
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}`);
      onCommentDeleted(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-list-container">
      <h2>Comentarios</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <button
              onClick={() => handleDelete(comment.id)}
              className="delete-button"
            >
              🗑️
            </button>
            <strong>{comment.username}</strong>: {comment.comment_text} (Rating: {comment.rating})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
