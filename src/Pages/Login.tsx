import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/");
      console.log("ROLE AFTER LOGIN:", res.data.role); // dashboard
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Login
        </button>
         <p>New to Awaj? <Link to='/register' className="text-green-600">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;

//  import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../api/authApi";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await login(email, password);
//       localStorage.setItem("token", res.token); // ✅ save JWT
//       navigate("/"); // navigate to complaints list
//     } catch {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {error && <p className="mb-4 text-red-600">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border border-gray-300 p-3 rounded-lg"
//         />
//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

//  import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();

//   const handleLogin = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     console.log(data);

//     if (data.success) {
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     }
//   };
//      return (
//         <div className="hero bg-base-200 min-h-screen">
             
//                 <form onSubmit={handleLogin} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                     <div className="card-body">
//                         <fieldset className="fieldset">
//                             <label className="label">Email</label>
//                             <input type="email" className="input" placeholder="Email"
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                                setEmail(e.target.value)
//         } />
//                             <label className="label">Password</label>
//                             <input type="password" className="input" placeholder="Password" 
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                                setPassword(e.target.value)
//         }/>
//                             <div><a className="link link-hover">Forgot password?</a></div>
//                             <button type="submit" className="btn bg-orange-300 mt-4 ">Login</button>
//                         </fieldset>
//                           <p>New to Awaj? <Link to='/signup' className="text-blue-600">Sign up</Link></p>
//                     </div>
                  
//                 </form>
                
           
//         </div>
//     );
// };

// export default Login;

// // import { Link } from "react-router-dom";
 




// // const Login = () => {
// //     return (
// //         <div className="hero bg-base-200 min-h-screen">
             
// //                 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
// //                     <div className="card-body">
// //                         <fieldset className="fieldset">
// //                             <label className="label">Email</label>
// //                             <input type="email" className="input" placeholder="Email" />
// //                             <label className="label">Password</label>
// //                             <input type="password" className="input" placeholder="Password" />
// //                             <div><a className="link link-hover">Forgot password?</a></div>
// //                             <button className="btn btn-neutral mt-4">Login</button>
// //                         </fieldset>
// //                           <p>New to Awaj? <Link to='/signup'>Sign up</Link></p>
// //                     </div>
                  
// //                 </div>
                
           
// //         </div>
// //     );

// // };

// // export default Login;