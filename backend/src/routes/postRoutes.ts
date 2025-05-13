import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController';

const router = Router();

// GET all posts
router.get('/', getPosts);

// GET single post
router.get('/:id', getPost);

// POST new post
router.post('/', createPost);

// PUT update post
router.put('/:id', updatePost);

// DELETE post
router.delete('/:id', deletePost);

export default router;