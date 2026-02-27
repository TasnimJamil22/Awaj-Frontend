// import { getDashboard } from '@/services/api';
// import React, { useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     getDashboard()
//       .then(res => setMessage(res.data.message))
//       .catch(err => {
//         alert('Unauthorized. Please login.');
//         navigate('/'); // redirect to login
//         console.log(err);
//       });
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // remove JWT
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>{message}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Dashboard;