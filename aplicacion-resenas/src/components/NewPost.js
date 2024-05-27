import React, { useState } from 'react';
import axios from 'axios';

const NewPostForm = ({ onClose, onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formData);  
      onPostCreated(response.data);
      setText('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Post</h2>
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
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" >Create Post</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
