import React from 'react';
import '../styles/Post.css';

const Comments = ({ comments }) => {
  return (
    <div className="comment-list-container">
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <strong>{comment.username}</strong>: {comment.comment_text} (Rating: {comment.rating})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
