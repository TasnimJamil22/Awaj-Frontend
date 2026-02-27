// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
  
import "./index.css";
import router from "./Router/Routes/Routes";
// import UserProvider from './context/user.provider';
 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <UserProvider> */}
      <RouterProvider router={router} />
    {/* </UserProvider> */}
  </React.StrictMode>
);