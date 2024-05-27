import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import NewPost from '../components/NewPost';
import EditPostModal from '../components/EditPostModal';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  const handlePostCreated = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1>Lista de publicaciones</h1>
      <button onClick={() => setShowNewPost(true)}>Crear nueva publicación</button>
      <div>
        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {showNewPost && (
        <NewPost
          onClose={() => setShowNewPost(null)}
          onPostCreated={handlePostCreated}
        />
      )}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onPostUpdated={handlePostUpdated}
        />
      )}
    </div>
  );
};

export default PostsPage;
