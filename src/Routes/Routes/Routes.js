import { createBrowserRouter } from "react-router-dom";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import DashboardLayout from "../../Pages/Layout/DashboardLayout";
import Main from "../../Pages/Layout/Main";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            }   
        ] 
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment></MyAppointment>
            }
        ]
    }
])
export default router;