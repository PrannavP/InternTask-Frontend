import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import SideNavBarComponent from "../components/SideNavBarComponent";
import "../styles/employee_page.css";

const EmployeesListPage = () => {
    const [employees, setEmployees] = useState([]); // initially empty array
    const navigate = useNavigate();

    const deleteNotifyNotify = () => toast.success("Employee Deleted", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "light"
    });

    const errorNotify = () => toast.error("Something went wrong while deleting!", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "light"
    });

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
            const deleteEmployeeApiCall = await axios.delete(`http://localhost:5147/api/Employee/DeleteEmployee/${id}`);

            deleteNotifyNotify();

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }catch(err){
            errorNotify();
            console.error(err);
        }
    };

    return (
        <>
        <SideNavBarComponent />
        <div className="employees-list-page">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                theme="light"
            />
            
            <h1 className="employee-list-page-header">Employees List</h1>

            <div className="create-new-employee-button-container">
                <button onClick={() => navigate("/create-employee")}>Create New Employee</button>
            </div>

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