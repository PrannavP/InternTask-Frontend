import SideNavBarComponent from "../components/SideNavBarComponent";

import "../styles/dashboard.css";

const DashboardPage = () => {
    const logoutHandler = () => {
        localStorage.removeItem("token");

        // redirect to login page
        window.location.href = "/login";
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