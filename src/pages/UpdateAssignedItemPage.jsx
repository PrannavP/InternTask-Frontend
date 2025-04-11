import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideNavBarComponent from "../components/SideNavBarComponent";
import "../styles/update-assigned-item-page.css";
import axios from "axios";

const UpdateAssignedItemPage = () => {
    const { id } = useParams();

    const [itemData, setItemData] = useState(null);
    const [remarks, setRemarks] = useState(""); // Separate state for remarks
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignedItem = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5147/api/employeeitem/GetAssignedItemById/${id}`
                );

                const data = response.data[0]; // Access the first item in the array
                setItemData(data);
                setRemarks(data.remarks); // Set remarks separately
                setLoading(false);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch assigned item data");
                setLoading(false);
            }
        };

        fetchAssignedItem();
    }, [id]);

    if (loading) {
        return <p className="loading-text">Loading...</p>;
    }

    return (
        <>
            <SideNavBarComponent />
            <div className="update-assigned-item-container">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    theme="light"
                />

                <h1 className="page-title">Assigned Item Details</h1>

                {/* Form group for Employee Name */}
                <div className="form-group">
                    <label className="form-label">Employee Name:</label>
                    <input
                        type="text"
                        value={itemData.employee_name}
                        readOnly
                        className="form-input"
                    />
                </div>

                {/* Form group for Employee Code */}
                <div className="form-group">
                    <label className="form-label">Employee Code:</label>
                    <input
                        type="text"
                        value={itemData.employee_id}
                        readOnly
                        className="form-input"
                    />
                </div>

                {/* Form group for Assigned Date */}
                <div className="form-group">
                    <label className="form-label">Assigned Date:</label>
                    <input
                        type="text"
                        value={new Date(itemData.created_at).toLocaleDateString()}
                        readOnly
                        className="form-input"
                    />
                </div>

                {/* Form group for Item Name */}
                <div className="form-group">
                    <label className="form-label">Item Name:</label>
                    <input
                        type="text"
                        value={itemData.item_name}
                        readOnly
                        className="form-input"
                    />
                </div>

                {/* Form group for Quantity (Editable) */}
                <div className="form-group">
                    <label className="form-label">Quantity:</label>
                    <input
                        type="number"
                        value={itemData.quantity}
                        onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
                        className="form-input"
                    />
                </div>

                {/* Remarks (Editable) */}
                <div className="form-group">
                    <label className="form-label">Remarks:</label>
                    <textarea
                        value={remarks} // Using separate state for remarks
                        onChange={(e) => setRemarks(e.target.value)} // Update only remarks state
                        className="form-input"
                    />
                </div>
            </div>
        </>
    );
};

export default UpdateAssignedItemPage;