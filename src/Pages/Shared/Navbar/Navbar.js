import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const Navbar = () => {
  const { user, LogOut } = useContext(AuthContext);
  const handlogout = () => {
    localStorage.clear();
    LogOut()
      .then(() => {})
      .catch((e) => console.error(e));
  };
  const currentURL = window.location.href;
  const isDashboard = currentURL.includes("/dashboard");
  const manuItems = (
    <React.Fragment>
      <li>
        <Link className="font-bold rounded-lg" to="/">
          <h1 className="font-mono text-xl">Home</h1>
        </Link>
      </li>
      <li>
        <Link className="font-bold rounded-lg" to="/appointment">
          <h1 className="font-mono text-xl">Appointment</h1>
        </Link>
      </li>
      <li>
        <Link className="font-bold rounded-lg" to="/aboutus">
          <h1 className="font-mono text-xl">About</h1>
        </Link>
      </li>
      <li>
        <Link className="font-bold rounded-lg" to="/reviews">
          <h1 className="font-mono text-xl">Reviews</h1>
        </Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link className="font-bold  rounded-lg" to="/dashboard">
              <h1 className="font-mono text-xl">DashBoard</h1>
            </Link>
          </li>
          <li>
            {" "}
            <button
              onClick={handlogout}
              className="font-bold rounded-lg"
              to="/login"
            >
              <h1 className="font-mono text-xl">Sign out</h1>
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link className="font-bold rounded-lg" to="/login">
            <h1 className="font-mono text-xl">Login</h1>
          </Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
          >
            {manuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <div className="w-8 rounded avatar">
            <img
              src="https://i.ibb.co/Y3pY6WR/tooth.png"
              alt="Doctors Portal"
            ></img>
          </div>
          <h1 className="font-mono text-2xl">Doctors Portal</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{manuItems}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className={isDashboard === false ? `hidden` : `btn btn-ghost lg:hidden`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
