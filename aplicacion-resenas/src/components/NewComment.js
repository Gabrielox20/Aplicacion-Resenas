import React, { useState } from 'react';
import '../styles/Post.css';
import axios from 'axios';

const NewComment = ({ postId, onClose, onCommentAdded }) => {
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
        post_id: postId,
        username,
        comment_text: commentText,
        rating
      });

      onCommentAdded(response.data);
      setUsername('');
      setCommentText('');
      setRating(0);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="commentText">Comment:</label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="0"
              max="5"
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewComment;
