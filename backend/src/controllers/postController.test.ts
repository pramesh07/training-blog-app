import { Request, Response } from 'express';
import * as postController from './postController';
import Post from '../models/Post';
 
// Mock the Post model
jest.mock('../models/Post');

describe('Post Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObj: any = {};

  beforeEach(() => {
    mockRequest = {};
    responseObj = {
      statusCode: 0,
      json: jest.fn().mockReturnThis()
    };
    mockResponse = {
      status: jest.fn().mockImplementation((code) => {
        responseObj.statusCode = code;
        return responseObj;
      })
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return all posts sorted by createdAt', async () => {
      const mockPosts = [
        { _id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
        { _id: '2', title: 'Post 2', content: 'Content 2', author: 'Author 2' }
      ];
      
      // Fix the mock implementation to properly chain methods
      const mockSort = jest.fn().mockResolvedValue(mockPosts);
      (Post.find as jest.Mock).mockReturnValue({
        sort: mockSort
      });

      await postController.getPosts(mockRequest as Request, mockResponse as Response);

      expect(Post.find).toHaveBeenCalled();
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObj.json).toHaveBeenCalledWith(mockPosts);
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      (Post.find as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await postController.getPosts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Error fetching posts', error });
    });
  });

  describe('getPost', () => {
    it('should return a post by ID', async () => {
      const mockPost = { _id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' };
      mockRequest.params = { id: '1' };
      (Post.findById as jest.Mock).mockResolvedValue(mockPost);

      await postController.getPost(mockRequest as Request, mockResponse as Response);

      expect(Post.findById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObj.json).toHaveBeenCalledWith(mockPost);
    });

    it('should return 404 when post not found', async () => {
      mockRequest.params = { id: 'nonexistent' };
      (Post.findById as jest.Mock).mockResolvedValue(null);

      await postController.getPost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: '1' };
      (Post.findById as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await postController.getPost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Error fetching post', error });
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const postData = { title: 'New Post', content: 'New Content', author: 'Author' };
      const mockPost = { _id: '1', ...postData };
      mockRequest.body = postData;
      (Post.create as jest.Mock).mockResolvedValue(mockPost);

      await postController.createPost(mockRequest as Request, mockResponse as Response);

      expect(Post.create).toHaveBeenCalledWith(postData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObj.json).toHaveBeenCalledWith(mockPost);
    });

    it('should handle errors', async () => {
      const error = new Error('Validation error');
      mockRequest.body = { title: 'New Post' };
      (Post.create as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await postController.createPost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Error creating post', error });
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const updateData = { title: 'Updated Title', content: 'Updated Content' };
      const mockPost = { _id: '1', ...updateData };
      mockRequest.params = { id: '1' };
      mockRequest.body = updateData;
      (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPost);

      await postController.updatePost(mockRequest as Request, mockResponse as Response);

      expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('1', updateData, { new: true });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObj.json).toHaveBeenCalledWith(mockPost);
    });

    it('should return 404 when post not found', async () => {
      mockRequest.params = { id: 'nonexistent' };
      mockRequest.body = { title: 'Updated Title' };
      (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await postController.updatePost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: '1' };
      mockRequest.body = { title: 'Updated Title' };
      (Post.findByIdAndUpdate as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await postController.updatePost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Error updating post', error });
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const mockPost = { _id: '1', title: 'Post 1' };
      mockRequest.params = { id: '1' };
      (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(mockPost);

      await postController.deletePost(mockRequest as Request, mockResponse as Response);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Post deleted successfully' });
    });

    it('should return 404 when post not found', async () => {
      mockRequest.params = { id: 'nonexistent' };
      (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await postController.deletePost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: '1' };
      (Post.findByIdAndDelete as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await postController.deletePost(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObj.json).toHaveBeenCalledWith({ message: 'Error deleting post', error });
    });
  });
});