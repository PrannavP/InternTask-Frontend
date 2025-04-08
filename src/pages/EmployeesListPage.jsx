import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SideNavBarComponent from "../components/SideNavBarComponent";
import "../styles/employee_page.css";

const EmployeesListPage = () => {
    const [employees, setEmployees] = useState([]); // initially empty array

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5147/api/employee/getallemployees");
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllEmployees();
    }, []);

    const deleteEmployee = async(id) => {
        try{
            console.log(id);
            const deleteEmployeeApiCall = await axios.delete(`http://localhost:5147/api/Employee/DeleteEmployee/${id}`);
            console.log(deleteEmployeeApiCall);
            console.log("Employee deleted successfully");
            window.location.reload();
        }catch(err){
            console.log("Something went wrong while deleting employee!", err);
        }
    };

    return (
        <>
        <SideNavBarComponent />
        <div className="employees-list-page">
            <h1 className="employee-list-page-header">Employees List</h1>
            {employees.length > 0 ? (
                <table className="employees-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone_number}</td>
                                <td>{employee.status}</td>
                                <td>
                                    <Link to={`/update-employee/${employee.id}`} className="edit-link">
                                        Edit
                                    </Link>
                                    {" | "}
                                    <button className="delete-button" onClick={() => deleteEmployee(employee.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-employees">No employees</p>
            )}
        </div>
        </>
    );
};

export default EmployeesListPage;