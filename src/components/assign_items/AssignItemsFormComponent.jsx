import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";

const AssignItemsFormComponent = () => {
    const admin = useAuth();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [addedItems, setAddedItems] = useState([]); // State to store added items
    const [isFormLocked, setIsFormLocked] = useState(false); // State to lock employee and date fields

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:5147/api/PurchaseDetail/getitemsname");
                setItems(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setLoading(false);
            }
        };

        fetchItems();

        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5147/api/employee/GetEmployeesNameAndId");
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleAddItem = (values, resetForm) => {
        const selectedEmployee = employees.find(
            (employee) => employee.id.toString() === values.employeeName
        );

        const newItem = {
            employeeId: values.employeeName, // This is actually the ID from the dropdown
            employeeName: selectedEmployee ? selectedEmployee.name : "Not Found",
            itemName: values.itemName,
            quantity: values.quantityToDecrease,
            date: values.date,
            remarks: values.remarks,
        };

        setAddedItems((prevItems) => [...prevItems, newItem]);
        setIsFormLocked(true); // Lock the employee and date fields
        resetForm({ values: { ...values, itemName: "", quantityToDecrease: 0, remarks: "" } }); // Reset only specific fields
    };

    const handleSubmitAll = async () => {
        if (addedItems.length === 0) {
            alert("No items to submit.");
            return;
        }

        const selectedEmployeeId = parseInt(addedItems[0].employeeId);
        const date = addedItems[0].date;
        const remarks = addedItems[0].remarks;

        const employeeItemsMaster = {
            employee_id: selectedEmployeeId,
            date,
            remarks,
        };

        const employeeItemsDetails = addedItems.map((item) => ({
            employee_name: item.employeeName,
            item_name: item.itemName,
            quantity: item.quantity,
            created_by: admin.email,
        }));

        try {
            for (const item of addedItems) {
                const decreaseURL = `http://localhost:5147/api/PurchaseDetail/decreasequantity/${item.itemName}/${item.quantity}`;
                const res = await axios.post(decreaseURL);
                if (!res.status === 200) {
                    throw new Error(`Failed to decrease quantity for ${item.itemName}`);
                }
            }

            const payload = {
                employeeItemsMaster,
                employeeItemsDetails,
            };

            const response = await axios.post("http://localhost:5147/api/EmployeeItem/AssignItem", payload);

            alert("Items successfully assigned to employee!");
            setAddedItems([]);
            setIsFormLocked(false); // Unlock the form after submission
        } catch (error) {
            console.error("Error submitting items:", error.response?.data || error.message);
            alert("Failed to assign items.");
        }
    };

    return (
        <div className="assign-items-container">
            <div className="form-section">
                <h2 className="form-title">Assign Items to Employee</h2>

                {loading ? (
                    <p className="loading-text">Loading items...</p>
                ) : (
                    <Formik
                        initialValues={{
                            employeeName: "",
                            itemName: "",
                            quantityToDecrease: 0,
                            date: "",
                            remarks: "",
                        }}
                        validationSchema={Yup.object({
                            employeeName: Yup.string().required("Employee name is required"),
                            itemName: Yup.string().required("Item name is required."),
                            quantityToDecrease: Yup.number()
                                .positive("Quantity must be a positive number.")
                                .required("Quantity to decrease is required.")
                                .integer("Quantity must be an integer.")
                                .min(1, "Quantity must be at least 1."),
                            date: Yup.date().required("Date is required."),
                            remarks: Yup.string().max(200, "Remarks cannot exceed 200 characters."),
                        })}
                        onSubmit={(values, { resetForm }) => {
                            handleAddItem(values, resetForm);
                        }}
                    >
                        <Form className="assign-items-form">
                            <div className="form-group">
                                <label htmlFor="employeeName">Employee Name:</label>
                                <Field
                                    as="select"
                                    id="employeeName"
                                    name="employeeName"
                                    className="form-control"
                                    disabled={isFormLocked} // Disable if form is locked
                                >
                                    <option value="">Select an employee</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="employeeName" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <Field
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    disabled={isFormLocked} // Disable if form is locked
                                />
                                <ErrorMessage name="date" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="itemName">Item Name:</label>
                                <Field as="select" id="itemName" name="itemName" className="form-control">
                                    <option value="">Select an item</option>
                                    {items.map((item, index) => (
                                        <option key={index} value={item.item_name}>
                                            {item.item_name} - {item.remaining_qty} available
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="itemName" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantityToDecrease">Quantity:</label>
                                <Field
                                    type="number"
                                    id="quantityToDecrease"
                                    name="quantityToDecrease"
                                    min="1"
                                    placeholder="Enter quantity to decrease"
                                    className="form-control"
                                />
                                <ErrorMessage name="quantityToDecrease" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="remarks">Remarks:</label>
                                <Field
                                    as="textarea"
                                    id="remarks"
                                    name="remarks"
                                    placeholder="Enter remarks"
                                    rows="3"
                                    className="form-control"
                                />
                                <ErrorMessage name="remarks" component="div" className="error-message" />
                            </div>

                            <button type="submit" className="submit-button">
                                Add Item
                            </button>
                        </Form>
                    </Formik>
                )}
            </div>

            <div className="items-section">
                <h2 className="items-title">Added Items</h2>
                {addedItems.length > 0 ? (
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.itemName}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-items-text">No items added yet.</p>
                )}
                <button
                    className="submit-all-button"
                    onClick={handleSubmitAll}
                    disabled={addedItems.length === 0}
                >
                    Submit All
                </button>
            </div>
        </div>
    );
};

export default AssignItemsFormComponent;