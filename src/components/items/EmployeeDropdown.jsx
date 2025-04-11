import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDropdown = ({ selectedEmployee, setSelectedEmployee, selectedDate, setSelectedDate }) => {
    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        const fetchAllEmployeesData = async () => {
            try {
                const response = await axios.get("http://localhost:5147/api/employee/GetEmployeesNameAndId");
                setEmployeesData(response.data);
                // console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAllEmployeesData();

        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
    }, [setSelectedDate]);

    return (
        <>
        <div className="employee-selection-container">
            <div className="employee-name-dropdown-container">
                <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                    <option value="">Select an employee</option>
                    {employeesData.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-date-container">
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
        </div>
        </>
    );
};

export default EmployeeDropdown;