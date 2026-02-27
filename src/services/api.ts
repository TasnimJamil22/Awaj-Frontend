import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT token automatically to protected requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;


//  // src/services/api.ts
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/auth'; // backend URL

// // Define the type for login parameters
// export interface User {
//   email: string;
//   password: string;
// }

// // Login function
// export const login = ({ email, password }: User) => {
//   return axios.post<{ token: string }>(`${API_URL}/login`, { email, password });
// };

// // Get protected dashboard data
// export const getDashboard = () => {
//   const token = localStorage.getItem('token'); // get JWT from localStorage
//   return axios.get<{ message: string }>(`${API_URL}/dashboard`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };