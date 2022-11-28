import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const Navbar = () => {
    const { user, LogOut } = useContext(AuthContext);
    const handlogout = () => {
        LogOut().then(() => { }).catch(e => console.error(e))
    }
    const manuItems = <React.Fragment>
        <li><Link className='font-bold rounded-lg' to='/'>Home</Link></li>
        <li><Link className='font-bold rounded-lg' to='/appointment'>Appointment</Link></li>
        <li><Link className='font-bold rounded-lg' to='/about'>About</Link></li>
        <li><Link className='font-bold rounded-lg' to='/reviews'>Reviews</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link className='font-bold rounded-lg' to="/dashboard">DashBoard</Link></li>
                    <li> <button onClick={handlogout} className='font-bold rounded-lg' to='/login'>Sign out</button></li>
                </>

                :
                <li><Link className='font-bold rounded-lg' to='/login'>Login</Link></li>
        }

    </React.Fragment>
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ">
                        {
                            manuItems
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        manuItems
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;