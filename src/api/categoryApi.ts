import axios from "axios";
import type { Category } from "@/types/category";

const BASE_URL = "http://localhost:5000/api/categories";
const token = localStorage.getItem("token");

const config = { headers: { Authorization: `Bearer ${token}` } };

// GET all categories
export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(BASE_URL, config);
  return res.data;
};

// CREATE category
export const createCategory = async (data: Omit<Category, "_id">) => {
  const res = await axios.post(BASE_URL, data, config);
  return res.data;
};

// UPDATE category
export const updateCategory = async (id: string, data: Partial<Category>) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, config);
  return res.data;
};

// DELETE category
export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, config);
  return res.data;
};