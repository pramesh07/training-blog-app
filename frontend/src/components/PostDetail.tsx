import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Post } from '../services/postService';
import { getPost, deletePost } from '../services/postService';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">
          {error}
          <Link to="/" className="btn btn-primary">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <div className="error">
          Post not found
          <Link to="/" className="btn btn-primary">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <header>
        <div className="header-content">
          <h1>{post.title}</h1>
        </div>
      </header>

      <article className="post-content">
        <div className="post-meta">
          <span>By: {post.author}</span>
          {post.createdAt && (
            <>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </>
          )}
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <>
              <span>•</span>
              <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
            </>
          )}
        </div>

        <div className="content">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph && <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="post-actions">
          <Link to="/" className="btn back-btn">
            Back to Posts
          </Link>
          <Link to={`/edit/${post._id}`} className="btn btn-primary">
            Edit Post
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;