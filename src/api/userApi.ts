import API from "@/services/api";
import type { Complaint } from "@/types/complaint";

export const getMyComplaints = async (): Promise<Complaint[]> => {
  const res = await API.get("/complaints/my-complaints");
  return res.data;
};