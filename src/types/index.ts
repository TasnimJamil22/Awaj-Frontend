// src/types/index.ts

export type User = {
  id: number;
  name: string;
  email: string;
  role: "citizen" | "authority" | "superadmin";
};

export type Complaint = {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "resolved";
  citizen: string;
};