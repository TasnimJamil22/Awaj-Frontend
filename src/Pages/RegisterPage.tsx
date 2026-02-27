import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        fullName,
        email,
        password,
        phone,
        district,
        upazila,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);
      navigate("/"); // dashboard
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Upazila"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Register
        </button>
        <p>
          Already have an account?
          <Link to="/login" className="text-green-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { register } from "../api/authApi";

// const RegisterPage = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const [fullName, setFullName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [district, setDistrict] = useState("");
//     const [upazila, setUpazila] = useState("");

//     const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             const res = await register(email, password);
//             localStorage.setItem("token", res.token);
//             setMessage("✅ Registration successful! Redirecting...");
//             setTimeout(() => navigate("/"), 1000); // navigate to complaints page
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (err: any) {
//             setMessage(err.response?.data?.message || "❌ Registration failed");
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">Register</h2>
//             {message && <p className="mb-4 text-red-600">{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Full Name */}
//                 <input
//                     type="text"
//                     placeholder="Full Name"
//                     value={fullName}
//                     onChange={e => setFullName(e.target.value)}
//                     className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 />

//                 {/* Email */}
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 />

//                 {/* Password */}
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 />

//                 {/* Phone Number */}
//                 <input
//                     type="tel"
//                     placeholder="Phone Number"
//                     value={phone}
//                     onChange={e => setPhone(e.target.value)}
//                     className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 />

//                 {/* District */}
//                 <input
//                     type="text"
//                     placeholder="District"
//                     value={district}
//                     onChange={e => setDistrict(e.target.value)}
//                     className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 />

//                 {/* Upazila */}
//                 <input
//                     type="text"
//                     placeholder="Upazila"
//                     value={upazila}
//                     onChange={e => setUpazila(e.target.value)}
//                     className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 />

//                 <button
//                     type="submit"
//                     className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition"
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPage;
