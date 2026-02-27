 import React from "react";
import type { Complaint } from "../dashboards/SuperAdminDashboard";
 

type ComplaintListProps = {
  complaints: Complaint[];
  onClick: (id: number) => void;
};

const ComplaintList: React.FC<ComplaintListProps> = ({ complaints, onClick }) => (
  <table className="min-w-full bg-white border">
    <thead className="bg-gray-200">
      <tr>
        <th className="py-2 px-4 border">Title</th>
        <th className="py-2 px-4 border">Citizen</th>
        <th className="py-2 px-4 border">Status</th>
        <th className="py-2 px-4 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {complaints.map((c) => (
        <tr key={c.id}>
          <td className="py-2 px-4 border">{c.title}</td>
          <td className="py-2 px-4 border">{c.citizen}</td>
          <td className="py-2 px-4 border">{c.status}</td>
          <td className="py-2 px-4 border">
            <button
              className="bg-green-500 text-white px-2"
              onClick={() => onClick(c.id)}
            >
              Update
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ComplaintList;