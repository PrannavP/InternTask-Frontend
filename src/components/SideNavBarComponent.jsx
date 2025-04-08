import React from "react";
import { Link } from "react-router-dom";

import "../styles/side_navbar.css";

const SideNavBarComponent = () => {
    return (
        <div className="sidenav">
            <h2 className="sidenav-header">System Name</h2>
            <ul className="sidenav-links">
                <li>
                    <Link to="/" className="sidenav-link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/employees" className="sidenav-link">Employees</Link>
                </li>
                <li>
                    <Link to="/create-employee" className="sidenav-link">Create Employee</Link>
                </li>
                <li>
                    <Link to="/attendance" className="sidenav-link">Attendance</Link>
                </li>
                <li>
                    <Link to="/items" className="sidenav-link">Item Usage</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideNavBarComponent;