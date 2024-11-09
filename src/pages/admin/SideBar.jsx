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
            <Link to="/hotel/hotels" className="sidebar-link">Show Hotels</Link>
          </li>
          <li>
            <Link to="/admin/createhotel" className="sidebar-link">Create Hotels</Link>
          </li>
        </ul>
      </div>
      
      {/* Main Content Area */}
      <div className="content">
        <h1 className="content-heading">Welcome, Admin!</h1>
        <p className="content-description">Manage hotels</p>
      </div>
    </div>
    );
};