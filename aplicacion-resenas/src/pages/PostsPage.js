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
    axios.get('http://localhost:5000/api/posts')
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
      <h1>All Posts</h1>
      <button onClick={() => setShowNewPost(true)}>Create New Post</button>
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
          onClose={() => setShowNewPost(false)}
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
