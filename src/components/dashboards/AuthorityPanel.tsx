 
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
 
import type { Complaint } from "@/types/complaint";
 
import { Link } from "react-router-dom";
interface Props {
  complaint: Complaint;
}

const ComplaintCard = ({ complaint }: Props) => {
  return (
     <div className="card w-96 bg-base-100 card-xs shadow-sm" style={{ border: "1px solid gray", padding: "10px", marginBottom: "8px" }}>
      <div  className="card-body">
        <h2 className="card-title">{complaint.title}</h2>
    <p>{complaint.description}</p>
     <p>Status: {complaint.status}</p>
    {complaint.category && <p>Category: {complaint.category}</p>}
    {complaint.district && <p>District: {complaint.district}</p>}
       {complaint.upazila && <p>Upazila: {complaint.upazila}</p>}
      {/* <button className="btn bg-orange-400 hover:bg-orange-300">Update<CiEdit /></button> */}
      <button className="btn bg-orange-400 hover:bg-orange-300"><Link to={`/complaint/${complaint._id}`}>View Details</Link></button>
     
       
      </div>
    </div>
  );
};

export default ComplaintCard;