/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/services/api";

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState<any>(null);
  const [noteText, setNoteText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    API.get(`/complaints/${id}`)
      .then((res) => setComplaint(res.data))
      .catch((err) =>
        alert(err.response?.data?.message || "Error fetching complaint"),
      );
  }, [id]);

  const handleAddNote = async () => {
    if (!noteText) return;
    try {
      const res = await API.post(`/complaints/${id}/notes`, { text: noteText });
      setComplaint((prev: any) => ({ ...prev, notes: res.data.notes }));
      setNoteText("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding note");
    }
  };

  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg mt-4 shadow-lg bg-orange-50">
      {/* Complaint Title */}
      <h2 className="text-2xl font-bold mb-2 text-orange-700">
        {complaint.title}
      </h2>

      {/* Description */}
      <p className="mb-2 text-gray-700">{complaint.description}</p>

      {/* Status Badge */}
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span
          className={`px-2 py-1 rounded text-white ${complaint.status === "Submitted"
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
                        : "bg-gray-500"
            }`}
        >
          {complaint.status}
        </span>
      </p>

      {/* Submitted By */}
      <p className="mb-4">
        <strong>Submitted By:</strong>{" "}
        <span className="text-gray-800 font-medium">
          {complaint.anonymous ? "Anonymous" : complaint.createdBy}
        </span>
      </p>

      {/* Notes Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-orange-600">Notes</h3>
        {complaint.notes && complaint.notes.length > 0 ? (
          <ul className="space-y-3">
            {complaint.notes.map((n: any, i: number) => (
              <li
                key={i}
                className="p-3 border-l-4 border-orange-400 rounded bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-700">{n.text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  By <span className="font-medium">{n.author}</span> (
                  <span className="capitalize">{n.role}</span>) on{" "}
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes yet</p>
        )}

        {complaint.evidence && (
          <div className="mt-4">
            <h3 className="font-semibold">Evidence:</h3>
            <a
              href={`http://localhost:5000${complaint.evidence}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Evidence
            </a>

            <img
              src={`http://localhost:5000${complaint.evidence}`}
              alt="Evidence"
              className="mt-2 max-w-sm rounded shadow"
            />
          </div>
        )}
      </div>

      {/* Add Note (authority/superadmin only) */}
      {(role === "authority" || role === "superadmin") && (
        <div className="mt-6">
          <textarea
            placeholder="Add note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
            rows={3}
          />
          <button
            onClick={handleAddNote}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition font-semibold"
          >
            Add Note
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplaintDetailsPage;

// import { getComplaints } from "@/api/complaintsApi";
// import type { Complaint } from "@/types/complaint";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ComplaintDetailsPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [complaint, setComplaint] = useState<Complaint | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Status colors defined INSIDE the component
//   const statusColors: Record<string, string> = {
//     Pending: "bg-red-100 text-red-700",
//     "In Progress": "bg-yellow-100 text-yellow-800",
//     Resolved: "bg-green-100 text-green-700",
//   };
//   useEffect(() => {
//     const fetchComplaint = async () => {
//       try {
//         const complaints = await getComplaints();
//         const found = complaints.find((c) => c._id === id);
//         if (found) {
//           setComplaint(found);
//         } else {
//           setError("Complaint not found");
//         }
//       } catch {
//         setError("Error fetching complaint");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaint();
//   }, [id]);

//   if (loading)
//     return <p className="text-center mt-20 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
//   if (!complaint) return null;

//   return (
//     <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg font-sans text-gray-800">
//       <h2 className="text-3xl font-bold mb-6">{complaint.title}</h2>

//       <p className="mb-6">
//         <span className="font-semibold text-gray-700">Description:</span>{" "}
//         {complaint.description}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <p>
//           <span className="font-semibold text-gray-700">Category:</span>{" "}
//           {complaint.category}
//         </p>
//         <p>
//           <span className="font-semibold text-gray-700">Status:</span>{" "}
//           <span
//             className={`px-3 py-1 rounded-full font-medium ${statusColors[complaint.status]}`}
//           >
//             {complaint.status}
//           </span>
//         </p>
//         <p>
//           <span className="font-semibold text-gray-700">District:</span>{" "}
//           {complaint.district}
//         </p>
//         <p>
//           <span className="font-semibold text-gray-700">Upazila:</span>{" "}
//           {complaint.upazila}
//         </p>
//       </div>

//       <button
//         onClick={() => window.history.back()}
//         className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orangez-700 transition"
//       >
//         ← Back
//       </button>
//     </div>
//   );
// };

// export default ComplaintDetailsPage;
