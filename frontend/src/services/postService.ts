import axios from 'axios';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
const API_URL = viteEnv?.VITE_API_URL || 'http://localhost:5000/api/posts';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_URL);
  return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await axios.get<Post>(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, '_id'>): Promise<Post> => {
  const response = await axios.post<Post>(API_URL, post);
  return response.data;
};

export const updatePost = async (id: string, post: Partial<Post>): Promise<Post> => {
  const response = await axios.put<Post>(`${API_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};