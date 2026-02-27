import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../Pages/Login";
import SignUp from "../../Pages/SignUp";
import SubmitComplaint from "@/Pages/SubmitComplaint";
import LandingPage from "@/Pages/Home/Landing";
import Dashboard from "@/components/dashboards/AuthorityDashboard";
import ComplaintDetailsPage from "@/components/dashboards/ComplaintDetailsPage";
import ComplaintForm from "@/components/dashboards/ComplaintForm";
import RegisterPage from "@/Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoutes";
//@ts-expect-error dont know why

 import CreateAuthority from './../../Pages/CreateAuthority';
import MyComplaints from "@/Pages/MyComplaints";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },

      // ✅ Only logged-in users can submit complaint
      {
        path: "/complaint",
        element: (
          <ProtectedRoute roles={["user"]}>
            <SubmitComplaint />
          </ProtectedRoute>
        )
      },

      // ✅ Only authority & superadmin
      {
        path: "/authority",
        element: (
          <ProtectedRoute roles={["authority", "superadmin"]}>
            <Dashboard />
            
          </ProtectedRoute>
        )
      },
  

      // ✅ Any logged in role
      {
        path: "/complaint/:id",
        element: (
          <ProtectedRoute roles={["user", "authority", "superadmin"]}>
            <ComplaintDetailsPage />
          </ProtectedRoute>
        )
      },

      {
        path: "/complaintForm",
        element: (
          <ProtectedRoute roles={["user"]}>
            <ComplaintForm />
          </ProtectedRoute>
        )
      },

      {
        path: "/register",
        element: <RegisterPage />
      },
      // Superadmin only route
      {
        path: "/create-authority",
        element: (
          <ProtectedRoute roles={["superadmin"]}>
            <CreateAuthority />
          </ProtectedRoute>
        )
      },
      {
  path: "/my-complaints",
  element: (
    <ProtectedRoute roles={["user"]}>
      <MyComplaints />
    </ProtectedRoute>
  )
}
    ]
  }
]);

export default router;


// import { createBrowserRouter } from "react-router-dom";
// import Main from "../../Layout/Main";
// import Login from "../../Pages/Login";
// import SignUp from "../../Pages/SignUp";
// import SubmitComplaint from "@/Pages/SubmitComplaint";
// import LandingPage from "@/Pages/Home/Landing";
 
// import Dashboard from "@/components/dashboards/AuthorityDashboard";
// import ComplaintDetailsPage from "@/components/dashboards/ComplaintDetailsPage";
// import ComplaintForm from "@/components/dashboards/ComplaintForm";
// import RegisterPage from "@/Pages/RegisterPage";
// const router = createBrowserRouter([
// {
//     path:'/',
//     element: <Main/>,
//     children:[
//         {
//             path:'/',
//             element:<LandingPage></LandingPage>
//         },
//         {
//             path:'/login',
//             element:<Login></Login>
//         },
//         {
//             path:'/signup',
//             element:<SignUp></SignUp>
//         },
//         {
//             path:'/complaint',
//             element:<SubmitComplaint></SubmitComplaint>
//         },
//         {
//             path:'/authority',
//             element:<Dashboard></Dashboard>
//         },
//         {
//             path:'/complaint/:id',
//             element:<ComplaintDetailsPage/>
//         },
//         {
//             path:'/complaintForm',
//             element:<ComplaintForm/>
//         },
//         {
//             path:'/register',
//             element:<RegisterPage/>
//         }
         
//     ]

// }
// ])

// export default router