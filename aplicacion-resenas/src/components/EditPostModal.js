import React, { useState } from 'react';
import '../styles/Post.css';
import axios from 'axios';

const EditPostModal = ({ post, onClose, onPostUpdated }) => {
  const [text, setText] = useState(post.text);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/post/${post.id}`, { text });
      onPostUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text">Text:</label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
