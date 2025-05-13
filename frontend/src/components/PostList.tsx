import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../services/postService';
import { getPosts, deletePost } from '../services/postService';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">
          {error}
          <button onClick={fetchPosts} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div className="header-content">
          <h1>Welcome to WanderWords</h1>
          <Link to="/create" className="btn btn-success">
            Create New Post
          </Link>
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="no-posts">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.25 11.75L17.6644 6.41459C17.4191 5.61766 16.6841 5.05991 15.8482 5.05991H8.15181C7.31594 5.05991 6.58087 5.61766 6.33559 6.41459L4.75 11.75'/%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 13.25V8.75'/%3E%3Cpath stroke='%236b7280' stroke-width='1.5' d='M10.75 15.25H13.25'/%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.25 19.25H4.75L4.75 10C4.75 9.30964 5.30964 8.75 6 8.75L18 8.75C18.6904 8.75 19.25 9.30964 19.25 10L19.25 19.25Z'/%3E%3C/svg%3E"
            alt="No posts"
            style={{ marginBottom: '1.5rem', opacity: 0.7 }}
          />
          <h2>No Posts Yet</h2>
          <p>Create your first blog post to get started!</p>
          <Link to="/create" className="btn btn-success">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <article key={post._id} className="post-card">
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span>By: {post.author}</span>
                {post.createdAt && (
                  <span>
                    • {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p>{post.content.substring(0, 150)}...</p>
              <div className="post-actions">
                <Link to={`/post/${post._id}`} className="btn btn-primary">
                  Read More
                </Link>
                <Link to={`/edit/${post._id}`} className="btn btn-primary">
                  Edit
                </Link>
                <button 
                  onClick={() => post._id && handleDelete(post._id)}
                  className="btn btn-danger"
                  aria-label="Delete post"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;