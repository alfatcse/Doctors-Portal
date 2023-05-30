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
import AdminRoute from "../../Routes/AminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import MySchedule from "../../Pages/Dashboard/DoctorDash/MySchedule";
import MyPatient from "../../Pages/Dashboard/DoctorDash/MyPatient";
import MakeSchedule from "../../Pages/Dashboard/DoctorDash/MakeSchedule";
import Testimonial from "../../Pages/Home/Testimonial/Testimonial";
import Aboutus from "../../Pages/Home/Testimonial/Aboutus";
import AllPatient from "../../Pages/Dashboard/AllPatient/AllPatient";
import { host } from "../../Utils/APIRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/reviews",
        element: <Testimonial></Testimonial>,
      },
      {
        path: "/aboutus",
        element: <Aboutus></Aboutus>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/patient",
        element: (
          <AdminRoute>
            <AllPatient></AllPatient>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managedoctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/myschedule",
        element: <MySchedule></MySchedule>,
      },
      {
        path: "/dashboard/mypatient",
        element: <MyPatient></MyPatient>,
      },
      {
        path: "/dashboard/newschedule",
        element: <MakeSchedule></MakeSchedule>,
      },
    ],
  },
]);
export default router;
