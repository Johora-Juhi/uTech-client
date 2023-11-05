import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosListBox } from "react-icons/io";

const Navbar = () => {
  const { pathname } = useLocation();
  const activePage = "bg-indigo-500 text-white px-2 pb-1 rounded"

  return (
    <nav className="h-14 bg-indigo-200 rounded-full m-2 max-w-7xl mx-auto px-5">
      <ul className="h-full  mx-auto hidden lg:flex justify-between items-center gap-3 font-semibold text-indigo-900">
        <h1 className="flex-1">Moon Tech</h1>
        <li>
          <Link to="/" className={`${pathname === "/" ? activePage : null}`}>Home</Link>
        </li>
        <li>
          <Link to="/top-rated" className={`${pathname.includes("top-rated") ? activePage : null}`}>Top Rated</Link>
        </li>
        <li>
          <Link to="/about" className={`${pathname.includes("about") ? activePage : null}`}>About</Link>
        </li>
        <li>
          <Link to="/dashboard" className={`${pathname.includes("dashboard") ? activePage : null}`}>Dashboard</Link>
        </li>
        <li title="Wishlist" className="bg-indigo-500 p-2 rounded-full">
          <Link to="/">
            <IoIosListBox className="text-white" />
          </Link>
        </li>
      </ul>
      <div className="flex justify-between items-center lg:hidden ">
      <h1 className="">Moon Tech</h1>

        <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/" className={`${pathname === "/" ? activePage : null}`}>Home</Link>
        </li>
        <li>
          <Link to="/top-rated" className={`${pathname.includes("top-rated") ? activePage : null}`}>Top Rated</Link>
        </li>
        <li>
          <Link to="/about" className={`${pathname.includes("about") ? activePage : null}`}>About</Link>
        </li>
        
        </ul>
       </div>
      </div>
    </nav >
  );
};

export default Navbar;
