import { useNavigate } from "react-router-dom";

import SideNavBarComponent from "../components/SideNavBarComponent";

import "../styles/dashboard.css";

const DashboardPage = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        // redirect to login page
        navigate("/login");
    };

    return (
        <>
        <SideNavBarComponent />
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard Page</h1>
            <button onClick={logoutHandler}>Logout</button>
        </div>
        </>
    );
};

export default DashboardPage;