import { useState } from "react";
import EmployeeDropdown from "../components/items/EmployeeDropdown";
import EmployeeItemForm from "../components/items/EmployeeItemForm";
import SideNavBarComponent from "../components/SideNavBarComponent";

import '../styles/items_page.css';

const ItemPage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    return (
        <>
            <SideNavBarComponent />
            <div className="items-page-main-container">
                <h1>Items Page</h1>

                <EmployeeDropdown
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />

                <EmployeeItemForm
                    selectedEmployee={selectedEmployee}
                    selectedDate={selectedDate}
                />
            </div>
        </>
    );
};

export default ItemPage;