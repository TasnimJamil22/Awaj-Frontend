 import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const register = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/register`, { email, password });
  return res.data; // { token, email }
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data; // { token, email }
};