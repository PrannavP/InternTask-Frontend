import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiAddLargeLine } from "react-icons/ri";

const EmployeeItemForm = ({ selectedEmployee, selectedDate }) => {
    const successNotify = () => toast.success("Employee Items Added", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    const errorNotify = () => toast.error("Please select the employee", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    const deleteNotify = () => toast.success("Deleted Item", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    const [items, setItems] = useState([
        { id: Date.now(), item_name: "", quantity: 1 }
    ]);

    const addItem = () => {
        setItems([...items, { id: Date.now(), item_name: "", quantity: 1 }]);
    };

    const handleChange = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async() => {
        // console.log("Employee ID:", selectedEmployee);
        // console.log("Selected Date:", selectedDate);
        // console.log("Items Data:", items);

        if (!selectedEmployee) {
            errorNotify();
            return;
        };

        try{
            const response = await axios.post("http://localhost:5147/api/item/save-items-usage", {
                employee_id: selectedEmployee,
                assigned_date: selectedDate,
                items: items
            });

            successNotify();
        }catch(err){
            console.error(err);
        }
    };

    const deleteItem = async (itemName) => {
        try {
            await axios.delete("http://localhost:5147/api/item/delete-item", {
                params: {
                    employee_id: selectedEmployee,
                    assigned_date: selectedDate,
                    item_name: itemName
                }
            });
    
            // Remove from UI
            setItems(items.filter(i => i.item_name !== itemName));

            deleteNotify();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    useEffect(() => {
        const fetchEmployeeItems = async () => {
            if (!selectedEmployee || !selectedDate) return;

            try {
                const response = await axios.get(`http://localhost:5147/api/Item/get-items`, {
                    params: {
                        employee_id: selectedEmployee,
                        assigned_date: selectedDate
                    }
                });

                setItems(response.data); // Set initial item list
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
    
        fetchEmployeeItems();
    }, [selectedEmployee, selectedDate]);    

    return (
        <div className="employee-items-form-container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                theme="light"
            />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <select
                                    value={item.item_name}
                                    onChange={(e) => handleChange(item.id, "item_name", e.target.value)}
                                >
                                    <option value="">SELECT ITEM</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Monitor">Monitor</option>
                                    <option value="Mouse">Mouse</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                                />
                            </td>
                            <td>
                                <span className="delete-icon-span" onClick={() => deleteItem(item.item_name)}>
                                    <RiDeleteBin6Line />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ textAlign: "center", marginTop: "25px" }}>
                <span className="add-icon-span" onClick={addItem}>
                    <RiAddLargeLine /><span>Add Item</span>
                </span>
            </div>

            <center>
                <div className="save-button-container">
                    <button onClick={handleSave}>Save</button>
                </div>
            </center>
        </div>
    );
};

export default EmployeeItemForm;