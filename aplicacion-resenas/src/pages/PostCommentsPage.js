import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostContent from '../components/PostContent';
import NewComment from '../components/NewComment';
import CommentList from '../components/Comments';

const PostCommentPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showNewComment, setShowNewComment] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/comments/${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostContent post={post} />
      <CommentList comments={comments} onCommentDeleted={handleCommentDeleted} />
      <button onClick={() => setShowNewComment(true)}>Add New Comment</button>
      {showNewComment && (
        <NewComment
          postId={id}
          onClose={() => setShowNewComment(false)}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </div>
  );
};

export default PostCommentPage;
