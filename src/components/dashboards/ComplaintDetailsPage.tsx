 import { getComplaints } from "@/api/complaintsApi";
import type { Complaint } from "@/types/complaint";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 

const ComplaintDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Status colors defined INSIDE the component
  const statusColors: Record<string, string> = {
    Pending: "bg-red-100 text-red-700",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-700",
  };
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const complaints = await getComplaints();
        const found = complaints.find(c => c._id === id);
        if (found) {
          setComplaint(found);
        } else {
          setError("Complaint not found");
        }
      } catch {
        setError("Error fetching complaint");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!complaint) return null;

   
  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg font-sans text-gray-800">
      <h2 className="text-3xl font-bold mb-6">{complaint.title}</h2>

      <p className="mb-6">
        <span className="font-semibold text-gray-700">Description:</span> {complaint.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <p>
          <span className="font-semibold text-gray-700">Category:</span> {complaint.category}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Status:</span>{" "}
          <span className={`px-3 py-1 rounded-full font-medium ${statusColors[complaint.status]}`}>
            {complaint.status}
          </span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">District:</span> {complaint.district}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Upazila:</span> {complaint.upazila}
        </p>
      </div>

      <button
        onClick={() => window.history.back()}
        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        ← Back
      </button>
    </div>
  );
};

export default ComplaintDetailsPage;