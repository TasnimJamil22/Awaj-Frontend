import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../Pages/Login";
import SignUp from "../../Pages/SignUp";
import SubmitComplaint from "@/Pages/SubmitComplaint";

const router = createBrowserRouter([
{
    path:'/',
    element: <Main/>,
    children:[
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
        {
            path:'/complaint',
            element:<SubmitComplaint></SubmitComplaint>
        }
    ]

}
])

export default router