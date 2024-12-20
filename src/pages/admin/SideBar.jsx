import React from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
    return (
        <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Dashboard</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/hotel/hotels" className="sidebar-link">Show Hotels And Menu</Link>
          </li>
          <li>
            <Link to="/admin/createhotel" className="sidebar-link">Create Hotels and Menu</Link>
          </li>
          <li>
            <Link to="/admin/edithotel" className="sidebar-link">Edit Hotel </Link>
          </li>
          <li>
            <Link to="/admin/editmenu" className="sidebar-link">Edit Menu </Link>
          </li>
          <li>
            <Link to="/admin/all" className="sidebar-link">users</Link>
          </li>
        </ul>
      </div>
      
      {/* Main Content Area */}
      <div className="content">
      
      </div>
    </div>
    );
};