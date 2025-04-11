import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/assigned_items_page.css";
import SideNavBarComponent from "../components/SideNavBarComponent";
import { Link } from "react-router-dom";

const AssignedItemsPage = () => {
    const [assignedItemsData, setAssignedItemsData] = useState([]);

    useEffect(() => {
        const fetchAllAssignedItemsFnc = async () => {
            try {
                const response = await axios.get("http://localhost:5147/api/employeeitem/getallassigneditems");
                console.log(response.data);
                setAssignedItemsData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAllAssignedItemsFnc();
    }, []);

    const handleAssignedItemDeleteClick = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:5147/api/employeeitem/DeleteAssignedItem/${id}`)
            console.log(response);
            toast.success("Assigned Item Deleted");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }catch(err){
            console.error(err);
        }
    };

    return (
        <>
            <SideNavBarComponent />
            <div className="assigned-items-page-main-container">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    newestOnTop={true}
                    closeOnClick={true}
                    rtl={false}
                    theme="light"
                />
                <h1 className="page-title">Assigned Items List</h1>
                {assignedItemsData.length > 0 ? (
                    <table className="assigned-items-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Date</th>
                                <th>Details</th>
                                <th>Remarks</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedItemsData.map((item) => {
                                const firstDetail = item.details[0] || {}; // Get the first detail or an empty object
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.employee_id}</td>
                                        <td>{firstDetail.employee_name || "N/A"}</td>
                                        <td>{new Date(item.date).toLocaleDateString()}</td>
                                        <td>
                                            <ul>
                                                {item.details.map((detail, index) => (
                                                    <li key={index}>
                                                        {detail.item_name} - {detail.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{item.remarks}</td>
                                        <td>{firstDetail.created_by}</td>
                                        <td>{new Date(firstDetail.created_at).toLocaleString()}</td>
                                        <td style={{ width: "112px" }}>
                                            <Link to={`/assigned-items/${item.id}`} className="edit-link">
                                                Edit
                                            </Link>
                                            {" | "}
                                            <button className="delete-button" onClick={() => handleAssignedItemDeleteClick(item.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data-text">No assigned items found.</p>
                )}
            </div>
        </>
    );
};

export default AssignedItemsPage;