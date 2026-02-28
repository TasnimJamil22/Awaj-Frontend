import API from "@/services/api";
import type { Complaint } from "@/types/complaint";

// GET all complaints
export const getComplaints = async (): Promise<Complaint[]> => {
  const res = await API.get("/complaints");
  return res.data;
};

// GET logged in user's complaints
export const getMyComplaints = async (): Promise<Complaint[]> => {
  const res = await API.get("/complaints/my-complaints");
  return res.data;
};

const token = localStorage.getItem("token"); // get JWT

 // ✅ Create complaint (with evidence support)
export const createComplaint = async (formData: FormData): Promise<Complaint> => {
  const res = await API.post("/complaints", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // add JWT
    },
  });
  return res.data;
}
// // CREATE complaint (with evidence support)
// export const createComplaint = async (formData: FormData) => {
//   const res = await API.post("/complaints", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// };

// UPDATE status
export const updateComplaintStatus = async (
  id: string,
  status: string
) => {
  const res = await API.put(`/complaints/${id}/status`, { status });
  return res.data;
};

// ADD note
export const addComplaintNote = async (
  id: string,
  text: string
) => {
  const res = await API.post(`/complaints/${id}/notes`, { text });
  return res.data;
};

// import API from "@/services/api";
// import type { Complaint } from "@/types/complaint";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/complaints";

// const token = localStorage.getItem("token"); // ✅ get JWT

// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

// export const getComplaints = async (): Promise<Complaint[]> => {
//   const res = await axios.get(BASE_URL, config);
//   return res.data;
// };
// // Get only logged-in user's complaints
// export const getMyComplaints = async (): Promise<Complaint[]> => {
//   const res = await axios.get(`${BASE_URL}/my-complaints`, config);
//   return res.data;
// };
// // CREATE complaint (with evidence support)
// export const createComplaint = async (formData: FormData) => {
//   const res = await API.post("/complaints", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res.data;
// };

// // export const createComplaint = async (
// //   data: Omit<Complaint, "_id" | "status">,
// // ) => {
// //   const res = await axios.post(BASE_URL, data, config);
// //   return res.data;
// // };
// //UPDATE COMPLAINT STATUS
// export const updateComplaintStatus = async (id: string, status: string) => {
//   const res = await API.put(`/complaints/${id}/status`, { status });
//   return res.data;
// };

//
//
// import type { Complaint } from "@/types/complaint";
// export const getComplaints = async (): Promise<Complaint[]> => {
//   const response = await fetch("http://localhost:5000/api/complaints");

//   if (!response.ok) {
//     throw new Error("Failed to fetch complaints");
//   }

//   return response.json();
// };

//  import type { Complaint } from "@/types/complaint";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/complaints";

// export const getComplaints = async (): Promise<Complaint[]> => {
//   const res = await axios.get(BASE_URL);
//   return res.data;
// };

// export const createComplaint = async (data: Omit<Complaint, "_id" | "status">) => {
//   const res = await axios.post(BASE_URL, data);
//   return res.data;
// };
