// Updated src/api.ts
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

export const getBlogs = async () => {
  const res = await axios.get(`${API_URL}/blogs`);
  return res.data;
};

export const getBlogById = async (id: number) => {
  const res = await axios.get(`${API_URL}/blogs/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};

export const addToCart = async (productId: number, quantity: number) => {
  const res = await axios.post(`${API_URL}/cart`, { productId, quantity });
  return res.data;
};

export const getCart = async () => {
  const res = await axios.get(`${API_URL}/cart`);
  return res.data;
};

export const checkout = async () => {
  const res = await axios.post(`${API_URL}/checkout`);
  return res.data;
};

// Assume backend has these endpoints; if not, implement mock or adjust.