import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className='col-span-2 bg-indigo-200 h-[calc(100vh-25px)] p-5 rounded-lg'>
      <ul className='flex gap-3  flex-col h-full'>
        <li>Admin Dashboard</li>
        <li  className={`${pathname === "/dashboard" ? "bg-indigo-500 text-white py-1" : "hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out py-1"}`}>
          <Link to='/dashboard' >Product List</Link>
        </li>
        <li  className={`${pathname.includes("add-product") ? "bg-indigo-500 text-white py-1" : "hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out py-1"}`}>
          <Link to='add-product'> Add Product </Link>
        </li>
        <li className="hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out py-1 mt-auto">
          <Link to='/'> Back to Home </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
