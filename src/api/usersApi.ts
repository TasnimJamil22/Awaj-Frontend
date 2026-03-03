 import API from "@/services/api";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

 // Get all authority users → for Assign District dropdown
export const getAuthorities = async () => {
  const res = await API.get("/users/authorities");
  return res.data; // array of authority users
};
 // Assign districts to a specific authority
export const assignDistrict = async (userId: string, districts: string[]) => {
  const res = await API.put(`/users/${userId}/assign-district`, { districts });
  return res.data;
}
export const getAssignedDistricts = async () => {
  const res = await API.get('/users/assigned-districts');
  return res.data; // { assignedDistricts: [...], role: 'authority' }
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