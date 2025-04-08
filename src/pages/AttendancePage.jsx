import AttendanceForm from "../components/attendance/AttendanceForm";
import SideNavBarComponent from "../components/SideNavBarComponent";

import "../styles/attendance_page.css";

const AttendacePage = () => {
    return (
        <>
        <SideNavBarComponent />
        <div className="attendance-page-main-container">
            <div className="attendance-page-container">
                <h1 className="attendance-page-container-heading">Employees Attendance</h1>
            </div>
            
        <AttendanceForm />
        </div>
        </>
    );
};

export default AttendacePage;