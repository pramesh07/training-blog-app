import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <div className="nav-content">
            <Link to="/" className="nav-brand">
              <h1>WanderWords</h1>
            </Link>
          </div>
        </nav>
        
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </div>
        </main>

        <footer>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} WanderWords. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;