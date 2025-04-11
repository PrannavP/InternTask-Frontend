import React from "react";
import { Link } from "react-router-dom";

import "../styles/side_navbar.css";

const SideNavBarComponent = () => {
    // handle logoout
    const handleLogoutFunction = () => {
        // delete token from localstorage
        localStorage.removeItem("token");

        // redirect to login page
        window.location.href = "/login";
    };

    return (
        <div className="sidenav">
            <h2 className="sidenav-header">Hamro System</h2>
            <ul className="sidenav-links">
                <li>
                    <Link to="/employees" className="sidenav-link">Employees</Link>
                </li>
                <li>
                    <Link to="/attendance" className="sidenav-link">Attendance</Link>
                </li>
                <li>
                    <Link to="/items" className="sidenav-link">Item Usage</Link>
                </li>
                <li>
                    <Link to="/items-list" className="sidenav-link">Items</Link>
                    <ul className="sidenav-sublinks">
                        <li>
                            <Link to="/purchase-item" className="sidenav-sublink">Purchase Items</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/assign-items" className="sidenav-link">Assign Item</Link>
                    <ul className="sidenav-sublinks">
                        <li>
                            <Link to="/assigned-items-list" className="sidenav-sublink">Assigned Items</Link>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="side-nav-bar-logout-button-container">
                <button onClick={handleLogoutFunction}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideNavBarComponent;