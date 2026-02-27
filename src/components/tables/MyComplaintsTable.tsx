import type { Complaint } from "@/types";

type MyComplaintsTableProps = {
  complaints: Complaint[];
};

const MyComplaintsTable = ({ complaints }:MyComplaintsTableProps) => (
  <table className="min-w-full bg-white border mt-2">
    <thead className="bg-gray-200">
      <tr>
        <th className="py-2 px-4 border">Title</th>
        <th className="py-2 px-4 border">Status</th>
      </tr>
    </thead>
    <tbody>
      {complaints.map(c => (
        <tr key={c.id}>
          <td className="py-2 px-4 border">{c.title}</td>
          <td className="py-2 px-4 border">{c.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MyComplaintsTable;