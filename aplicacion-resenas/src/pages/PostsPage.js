import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')  // Cambiar a 'http://backend:5000/api/posts' si está en Docker
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
