import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostCommentsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
