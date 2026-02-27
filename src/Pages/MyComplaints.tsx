/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
 
import type { Complaint } from "@/types/complaint";
import ComplaintCard from "@/components/dashboards/AuthorityPanel";
import { getMyComplaints } from "@/api/userApi";
 

const MyComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints();
        setComplaints(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Complaints</h2>
      {complaints.length === 0 && <p>You have not submitted any complaints yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint._id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;