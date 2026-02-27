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

export const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "citizen" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "authority" },
  { id: 3, name: "Carol", email: "carol@example.com", role: "superadmin" },
];

export const complaints: Complaint[] = [
  { id: 1, title: "Street light not working", status: "pending", citizen: "Alice" },
  { id: 2, title: "Water leakage", status: "in-progress", citizen: "Alice" },
];