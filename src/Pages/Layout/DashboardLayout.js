import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import useTitleHook from "../../Hooks/useTitleHook";
import Navbar from "../Shared/Navbar/Navbar";

const DashboardLayout = () => {
  useTitleHook("Dashboard");
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-base-100 w-80 text-base-content">
            {
              <li>
                <Link to="/dashboard">My Appointment</Link>
              </li>
            }
            {isAdmin === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/patient">All Patient</Link>
                </li>
                {/* <li>
                  <Link to="/dashboard/adddoctor">Add a Doctor</Link>
                </li> */}
                <li>
                  <Link to="/dashboard/managedoctors">Manage Doctor</Link>
                </li>
              </>
            )}
            {isAdmin === "Doctor" && (
              <>
                <li>
                  <Link to="/dashboard/myschedule">My Schedule</Link>
                </li>
                <li>
                  <Link to="/dashboard/mypatient">My Patient</Link>
                </li>
                <li>
                  <Link to="/dashboard/newschedule">New Schedule</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
