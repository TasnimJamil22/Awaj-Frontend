// export interface Complaint {
//   _id: string;
//   title: string;
//   description: string;
//   category: string;
//   district: string;
//   upazila: string;
//   status: string;
// }
export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  upazila: string;
  status: string;
  createdBy: string;
  createdAt: string;
  anonymous?: boolean; // ✅ Add this line
  statusHistory?: {
    status: string;
    updatedAt: string;
  }[];
  evidence?: string; // 👈 ADD THIS
  
}
