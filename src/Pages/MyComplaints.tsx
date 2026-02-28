import { useEffect, useState } from "react";

import ComplaintCard from "@/components/dashboards/AuthorityPanel";
import { getMyComplaints } from "@/api/complaintsApi";

const MyComplaints = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyComplaints()
      .then((res) => setComplaints(res))
      .catch((err) =>
        alert(err.response?.data?.message || "Error fetching complaints"),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (complaints.length === 0) return <p>No complaints found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {complaints.map((c) => (
        <ComplaintCard key={c._id} complaint={c} />
      ))}
    </div>
  );
};

export default MyComplaints;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";

// import type { Complaint } from "@/types/complaint";
// import ComplaintCard from "@/components/dashboards/AuthorityPanel";
// import { getMyComplaints } from "@/api/userApi";

// const MyComplaints = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const data = await getMyComplaints();
//         setComplaints(data);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Failed to fetch complaints");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComplaints();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Complaints</h2>
//       {complaints.length === 0 && <p>You have not submitted any complaints yet.</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {complaints.map((complaint) => (
//           <ComplaintCard key={complaint._id} complaint={complaint} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyComplaints;
