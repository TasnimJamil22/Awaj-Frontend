// import React from "react";
// import { CiEdit } from "react-icons/ci";
// interface Complaint {
//   _id: number;
//   title: string;
//   description: string;
//   category?: string; // optional
//   district?: string; // optional
//   upazila?: string;  // optional
//   status?:string
// }
// // Props type for AuthorityPanel
// interface AuthorityPanelProps {
//   complaint: Complaint;
// }
// const AuthorityPanel:React.FC<AuthorityPanelProps> = ({ complaint}) => {
//   return (
//      <div className="card w-96 bg-base-100 card-xs shadow-sm" style={{ border: "1px solid gray", padding: "10px", marginBottom: "8px" }}>
//       <div  className="card-body">
//         <h2 className="card-title">{complaint.title}</h2>
//       <p>{complaint.description}</p>
//       <p>Status: {complaint.status}</p>
//       {complaint.category && <p>Category: {complaint.category}</p>}
//       {complaint.district && <p>District: {complaint.district}</p>}
//       {complaint.upazila && <p>Upazila: {complaint.upazila}</p>}
//       <button className="btn bg-orange-400 hover:bg-orange-300">Update<CiEdit /></button>
//       </div>
//     </div>

//   );
// };

// export default AuthorityPanel;

import { updateComplaintStatus } from "@/api/complaintsApi";
import type { Complaint } from "@/types/complaint";

import { Link } from "react-router-dom";
interface Props {
  complaint: Complaint;
}
const statusWorkflow: Record<string, string[]> = {
  Submitted: ["Under Review"],
  "Under Review": ["Investigation", "Rejected"],
  Investigation: ["Action Taken", "Rejected"],
  "Action Taken": ["Closed"],
  Closed: [],
  Rejected: [],
};
const ComplaintCard = ({ complaint }: Props) => {
  const role = localStorage.getItem("role");
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateComplaintStatus(id, newStatus);
      alert("Status updated!");
      window.location.reload(); // simple refresh
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div
      className="card w-96 bg-base-100 card-xs shadow-sm"
      style={{ border: "1px solid gray", padding: "10px", marginBottom: "8px" }}
    >
      <div className="card-body">
        <h2 className="card-title">{complaint.title}</h2>
        <p>{complaint.description}</p>
        <p>Status: {complaint.status}</p>
        {complaint.category && <p>Category: {complaint.category}</p>}
        {complaint.district && <p>District: {complaint.district}</p>}
        {complaint.upazila && <p>Upazila: {complaint.upazila}</p>}
        <p className="font-semibold">
          Status:
          <span
            className={`ml-2 px-2 py-1 rounded text-white ${
              complaint.status === "Submitted"
                ? "bg-yellow-500"
                : complaint.status === "Under Review"
                  ? "bg-blue-500"
                  : complaint.status === "Investigation"
                    ? "bg-purple-500"
                    : complaint.status === "Action Taken"
                      ? "bg-orange-500"
                      : complaint.status === "Closed"
                        ? "bg-green-500"
                        : complaint.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-gray-500" // default if unknown status
            }`}
          >
            {complaint.status}
          </span>
        </p>
        {/* Only authority & superadmin can change status */}
        {/* {role === "authority" && (
          <select
            value={complaint.status}
            onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
            className="border p-2 mt-2"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        )} */}
        {(role === "authority" || role === "superadmin") &&
          statusWorkflow[complaint.status]?.length > 0 && (
            <select
              onChange={(e) =>
                handleStatusChange(complaint._id, e.target.value)
              }
              className="border p-2 mt-2"
              defaultValue=""
            >
              <option value="" disabled>
                Change Status
              </option>

              {statusWorkflow[complaint.status].map((nextStatus) => (
                <option key={nextStatus} value={nextStatus}>
                  {nextStatus}
                </option>
              ))}
            </select>
          )}
        <p>
          <strong>Submitted By:</strong>{" "}
          {complaint.anonymous ? "Anonymous" : complaint.createdBy}
        </p>

        {/* <button className="btn bg-orange-400 hover:bg-orange-300">Update<CiEdit /></button> */}
        <button className="btn bg-orange-400 hover:bg-orange-300">
          <Link to={`/complaint/${complaint._id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
