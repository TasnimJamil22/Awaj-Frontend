// import { useEffect, useState } from "react";
// import { getComplaints } from "@/api/complaintsApi";
// import type { Complaint } from "@/types/complaint";
 

// const AuthorityDashboard = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
  
//   // const assignedDistricts = JSON.parse(
//   //   localStorage.getItem("assignedDistricts") || "[]"
//   // );

//   // console.log(assignedDistricts);
//   // useEffect(() => {
//   //   getAuthorityComplaints().then(setComplaints);
//   // }, []);
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const complaints = await getComplaints();
//         setComplaints(complaints);
//       } catch (err) {
//         console.error("Failed to fetch complaints", err);
//       }
//     };

//     loadData();
//   }, []);


//   const total = complaints.length;

//   const resolved = complaints.filter(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (c: any) => c.status === "Closed"
//   ).length;


//   const open = complaints.filter(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (c: any) => c.status === "Submitted" && "Under Review" && "Investigation" && "Action Taken"
//   ).length;

//   const rejected = complaints.filter(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (c: any) => c.status === "Rejected"
//   ).length;

//   // Category Counts
//   const categoryCounts = complaints.reduce<Record<string, number>>(
//     (acc, complaint) => {
//       acc[complaint.category] =
//         (acc[complaint.category] || 0) + 1;
//       return acc;
//     },
//     {}
//   );
//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4 text-gray-700">Authority Dashboard</h2>

//       <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-4">
//         {/* total complaints */}
//         <div className="p-6 bg-green-500
//                 rounded-2xl shadow-lg text-white 
//                 text-center font-semibold">

//           <p className="text-lg opacity-90 tracking-wide">
//             Total Complaints
//           </p>

//           <h2 className="text-4xl font-bold mt-2">
//             {total}
//           </h2>

//         </div>
//         {/* resolved complaints */}
//         <div className="p-6  bg-red-400
//                 rounded-2xl shadow-lg text-white 
//                 text-center font-semibold">

//           <p className="text-lg opacity-90 tracking-wide">
//             Resolved Complaints
//           </p>

//           <h2 className="text-4xl font-bold mt-2">
//             {resolved}
//           </h2>

//         </div>
//         {/* open complaints */}
//         <div className="p-6 bg-blue-400
//                 rounded-2xl shadow-lg text-white 
//                 text-center font-semibold">

//           <p className="text-lg opacity-90 tracking-wide">
//             Open Complaints
//           </p>

//           <h2 className="text-4xl font-bold mt-2">
//             {open}
//           </h2>

//         </div>
//         {/* Rejected complaints */}
//         <div className="p-6 bg-yellow-500 
//                 rounded-2xl shadow-lg text-white 
//                 text-center font-semibold">

//           <p className="text-lg opacity-90 tracking-wide">
//             Rejected Complaints
//           </p>

//           <h2 className="text-4xl font-bold mt-2">
//             {rejected}
//           </h2>

//         </div>
//         {/* <div>
//           Assigned District: {assignedDistricts.length}
//         </div> */}

//       </div>
//       {/* Category Count */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">
//           Complaints by Category
//         </h2>

//         <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//           {Object.entries(categoryCounts).map(([cat, count]) => (
//             <div
//               key={cat}
//               className="p-4 bg-red-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
//             >
//               <span className="text-lg font-semibold text-gray-800">{cat}</span>
//               <span className="text-2xl font-bold text-blue-600 mt-2">{count}</span>
//             </div>
//           ))}
//         </div>
         
//       </div>

//     </div>
//   );
// };

// export default AuthorityDashboard;
import { useEffect, useState } from "react";
import { getComplaints } from "@/api/complaintsApi";
import type { Complaint } from "@/types/complaint";

const AuthorityDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [startDate, setStartDate] = useState<string>(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState<string>(""); // YYYY-MM-DD

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getComplaints();
        setComplaints(data); // make sure data is an array
      } catch (err) {
        console.error("Failed to fetch complaints", err);
      }
    };
    loadData();
  }, []);

  // ✅ Summary counts (all complaints, not filtered)
  const total = complaints.length;
  const openStatuses = ["Submitted", "Under Review", "Investigation", "Action Taken"];
  const resolved = complaints.filter(c => c.status === "Closed").length;
  const open = complaints.filter(c => openStatuses.includes(c.status)).length;
  const rejected = complaints.filter(c => c.status === "Rejected").length;

  // ✅ Filter only for category counts by date
  const filteredByDate = complaints.filter(c => {
    const complaintDate = new Date(c.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || complaintDate >= start) && (!end || complaintDate <= end);
  });

  const categoryCounts = filteredByDate.reduce<Record<string, number>>(
    (acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-4 text-gray-600">Authority <span className="text-orange-500">Dashboard</span></h2>

      {/* Summary Cards (all-time) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard label="Total Complaints" value={total} bgColor="bg-blue-400" />
        <StatCard label="Resolved" value={resolved} bgColor="bg-green-400" />
        <StatCard label="Open" value={open} bgColor="bg-orange-400" />
        <StatCard label="Rejected" value={rejected} bgColor="bg-red-400" />
      </div>

      {/* Date Range Picker (only affects category counts) */}
       <h2 className="text-3xl font-bold text-gray-700 mt-24 mb-5">
          <span className="text-orange-400">Complaints</span> by Category
        </h2>
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* Category Counts */}
      <div>
       

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div
              key={cat}
              className="p-4 bg-red-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
            >
              <span className="text-lg font-semibold text-orange-800">{cat}</span>
              <span className="text-2xl font-bold text-blue-600 mt-2">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;

// Reusable StatCard Component
interface StatCardProps {
  label: string;
  value: number;
  bgColor: string;
}

const StatCard = ({ label, value, bgColor }: StatCardProps) => (
  <div className={`p-6 ${bgColor} rounded-2xl shadow-lg text-white text-center font-semibold`}>
    <p className="text-lg opacity-90 tracking-wide">{label}</p>
    <h2 className="text-4xl font-bold mt-2">{value}</h2>
  </div>
);