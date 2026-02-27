//  // src/utils/auth.js
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'my-frontend-secret'; // ⚠️ This is exposed in frontend

// // Generate token
// export const generateToken = (user) => {
//   return jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
//     expiresIn: '1h',
//   });
// };

// // Decode token
// export const decodeToken = (token) => {
//   try {
//     return jwt.verify(token, SECRET_KEY);
//   } catch (err) {
//     return null;
//   }
// };

// // Save token
// export const saveToken = (token) => localStorage.setItem('token', token);

// // Get token
// export const getToken = () => localStorage.getItem('token');

// // Remove token
// export const removeToken = () => localStorage.removeItem('token');

// // Check if user is logged in
// export const isLoggedIn = () => {
//   const token = getToken();
//   if (!token) return false;
//   return decodeToken(token) !== null;
// };