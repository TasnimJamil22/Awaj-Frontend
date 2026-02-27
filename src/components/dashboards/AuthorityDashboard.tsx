/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// // import ComplaintList from "../tables/ComplaintList";
// // import { complaints } from "../../data/sampleData";

// // const AuthorityDashboard = () => {
// //   const handleUpdate = (id:number) => alert("Update complaint " + id);

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl mb-4">Authority Dashboard</h2>
// //       <ComplaintList complaints={complaints} onClick={handleUpdate} />
// //     </div>
// //   );
// // };

// // export default AuthorityDashboard;

// //
// //

// import { useEffect, useState } from "react";

// import axios from "axios";
// import AuthorityPanel from "./AuthorityPanel";
// interface Complaint {
//   _id: number;
//   title: string;
//   description: string;
//   category?: string; // optional
//   district?: string; // optional
//   upazila?: string;  // optional
//   status: string
// }
// const Dashboard = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [selectedDistrict, setSelectedDistrict] = useState("");

//   console.log(setComplaints);
//   useEffect(() => {
//     axios.get("/src/data/fakeComplaints.json")
//       .then((response) => {
//         setComplaints(response.data);
//       })
//       .catch((err) => console.error(err));
//   }, []); // empty dependency array = run once

// const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   setSelectedDistrict(e.target.value);
// };

// // Filter complaints by district
// const filteredComplaints = selectedDistrict
//   ? complaints.filter(c => c.district === selectedDistrict)
//   : complaints;

//   const districts = [
// "Dhaka","Gazipur","Tangail","Manikganj","Munshiganj","Narayanganj","Narsingdi",
// "Faridpur","Madaripur","Shariatpur","Rajbari",
// "Chattogram","Cox’s Bazar","Bandarban","Rangamati","Khagrachhari","Feni",
// "Noakhali","Lakshmipur","Brahmanbaria","Chandpur","Comilla",
// "Khulna","Jessore","Satkhira","Bagerhat","Narail","Chuadanga","Magura","Jhenaidah",
// "Barishal","Patuakhali","Bhola","Jhalokathi","Pirojpur","Barguna",
// "Sylhet","Moulvibazar","Habiganj","Sunamganj",
// "Rajshahi","Bogura","Joypurhat","Naogaon","Natore","Pabna","Sirajganj",
// "Rangpur","Dinajpur","Thakurgaon","Panchagarh","Nilphamari","Kurigram","Lalmonirhat","Gaibandha",
// "Mymensingh","Jamalpur","Netrokona","Sherpur"
// ];
//   return (
//     <div>
//       <h1 className="text-orange-700 text-3xl p-3">Complaints</h1>
//       {/* District Filter */}
//       <select value={selectedDistrict} onChange={handleDistrictChange} className="py-5">
//         <option value="">All Districts</option>
//         <option value="Dhaka">Dhaka</option>
//         <option value="Chittagong">Chittagong</option>
//         <option value="Sylhet">Sylhet</option>
//         <option value="Rajshahi">Rajshahi</option>
//         <option value="khulna">Khulna</option>
//         {/* Add other districts */}
//       </select>
//       {/* <select value={selectedDistrict} onChange={handleDistrictChange}>
//   <option value="">All Districts</option>
//   {districts.map(d => (
//     <option key={d} value={d}>{d}</option>
//   ))}
// </select> */}
//       <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg">
//         {
//           filteredComplaints.map((complaint) => (
//             <AuthorityPanel key={complaint._id} complaint={complaint} />
//           ))
//         }
//       </div>

//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from "react";
import ComplaintCard from "./AuthorityPanel";
import API from "@/services/api";
import type { Complaint } from "@/types/complaint";
 

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints");
        setComplaints(res.data);
      } catch (err: any) {
        setError("Error fetching complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // useEffect(() => {
  //   const fetchComplaints = async () => {
  //     try {
  //       const res = await API.get("/complaints");

  //       if (role === "user") {
  //         // show only complaints created by this user
  //         setComplaints(
  //           res.data.filter((c: any) => c.createdBy === email)
  //         );
  //       } else {
  //         // authority or superadmin sees all
  //         setComplaints(res.data);
  //       }
  //     } catch (err: any) {
  //       setError(err.response?.data?.message || "Error fetching complaints");
  //     } finally {
  //       setLoading(false); // ✅ important
  //     }
  //   };

  //   fetchComplaints();
  // }, [role, email]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  const filteredComplaints = selectedDistrict
    ? complaints.filter((c) => c.district === selectedDistrict)
    : complaints;

  const districts = [
    "Dhaka",
    "Gazipur",
    "Tangail",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Faridpur",
    "Madaripur",
    "Shariatpur",
    "Rajbari",
    "Chattogram",
    "Cox’s Bazar",
    "Bandarban",
    "Rangamati",
    "Khagrachhari",
    "Feni",
    "Noakhali",
    "Lakshmipur",
    "Brahmanbaria",
    "Chandpur",
    "Comilla",
    "Khulna",
    "Jessore",
    "Satkhira",
    "Bagerhat",
    "Narail",
    "Chuadanga",
    "Magura",
    "Jhenaidah",
    "Barishal",
    "Patuakhali",
    "Bhola",
    "Jhalokathi",
    "Pirojpur",
    "Barguna",
    "Sylhet",
    "Moulvibazar",
    "Habiganj",
    "Sunamganj",
    "Rajshahi",
    "Bogura",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Pabna",
    "Sirajganj",
    "Rangpur",
    "Dinajpur",
    "Thakurgaon",
    "Panchagarh",
    "Nilphamari",
    "Kurigram",
    "Lalmonirhat",
    "Gaibandha",
    "Mymensingh",
    "Jamalpur",
    "Netrokona",
    "Sherpur",
  ];
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Complaints</h2>

      <select
        value={selectedDistrict}
        onChange={handleDistrictChange}
        className="mb-4 border p-2 rounded"
      >
        <option value="">All Districts</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredComplaints.map((complaint) => (
          <ComplaintCard key={complaint._id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
