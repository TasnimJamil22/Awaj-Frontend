import { useState } from "react";
import API from "@/services/api";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/complaints", {
        title,
        description,
        category,
        district,
        upazila,
        anonymous,
      });
      alert("Complaint submitted!");
      // clear form
      setTitle("");
      setDescription("");
      setCategory("");
      setDistrict("");
      setUpazila("");
      setAnonymous(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error submitting complaint");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-orange-700 mb-6 text-center">
        Submit a Complaint
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* District */}
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Upazila */}
        <input
          type="text"
          placeholder="Upazila"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description spans full width */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full md:col-span-2 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        />

        {/* Anonymous checkbox */}
        <label className="flex items-center space-x-2 md:col-span-2">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700 font-medium">Submit Anonymously</span>
        </label>

        {/* Submit button spans full width */}
        <button
          type="submit"
          className="md:col-span-2 w-full bg-orange-400 text-white p-3 rounded hover:bg-orange-300 transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;

// /* eslint-disable @typescript-eslint/no-unused-vars */
//  import { createComplaint } from "@/api/complaintsApi";
// import React, { useState } from "react";

// const ComplaintForm = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upazila, setUpazila] = useState("");
//   const [message, setMessage] = useState(""); // ✅ confirmation message
//   const [isSuccess, setIsSuccess] = useState(false); // ✅ success/fail indicator

//   const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await createComplaint({ title, description, category, district, upazila });
//       setMessage("✅ Complaint submitted successfully!");
//       setIsSuccess(true);

//       // Reset form
//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setDistrict("");
//       setUpazila("");

//       // Hide message after 3 seconds
//       setTimeout(() => setMessage(""), 3000);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err:any) {
//       setMessage("❌ Error submitting complaint.");
//       setIsSuccess(false);

//       // Hide message after 3 seconds
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Create Complaint</h2>

//       {/* Confirmation message */}
//       {message && (
//         <div
//           className={`mb-4 p-3 rounded ${
//             isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
//           rows={4}
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />
//         <input
//           type="text"
//           placeholder="District"
//           value={district}
//           onChange={(e) => setDistrict(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />
//         <input
//           type="text"
//           placeholder="Upazila"
//           value={upazila}
//           onChange={(e) => setUpazila(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />

//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ComplaintForm;
