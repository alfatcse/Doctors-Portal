import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    console.log('', user);
    const [isAdmin] = useAdmin(user?.email);
    console.log('das', isAdmin);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 bg-base-100 w-80 text-base-content">
                        {
                            isAdmin==='Patient'&&<>
                             <li><Link to="/dashboard">My Appointment</Link></li>
                            </>
                        }
                       
                        {
                            isAdmin === 'admin' && <>
                                <li><Link to="/dashboard/allusers">All Users</Link></li>
                                <li><Link to="/dashboard/adddoctor">Add a Doctor</Link></li>
                                <li><Link to="/dashboard/managedoctors">Manage Doctor</Link></li>
                            </>
                        }
                        {
                            isAdmin === 'Doctor' && <>
                                <li><Link to="/dashboard/myschedule">My Schedule</Link></li>
                                <li><Link to="/dashboard/patient">My Patient</Link></li>
                                <li><Link to="/dashboard/newschedule">New Schedule</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;