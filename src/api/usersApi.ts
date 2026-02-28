 import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

// Get all authorities (for dropdown)
export const getAuthorities = async () => {
  const res = await axios.get(`${BASE_URL}/authorities`, config);
  return res.data;
};

// Assign districts
export const assignDistrict = async (userId: string, districts: string[]) => {
  const res = await axios.put(`${BASE_URL}/${userId}/assign-district`, { districts }, config);
  return res.data;
};
//get all users
export const getAllUsers = async () => {
  const res = await axios.get(BASE_URL, config);
  return res.data;
};

export const toggleSuspendUser = async (id: string) => {
  const res = await axios.put(`${BASE_URL}/${id}/suspend`, {}, config);
  return res.data;
};