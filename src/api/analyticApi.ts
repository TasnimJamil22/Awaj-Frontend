import axios from "axios";
import type { AnalyticsData } from "@/types/analytics";

const BASE_URL = "http://localhost:5000/api/analytics";

const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const res = await axios.get(BASE_URL, config);
  return res.data;
};

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

// export const getAnalytics = async () => {
//   const res = await API.get("/analytics");
//   return res.data;
// };