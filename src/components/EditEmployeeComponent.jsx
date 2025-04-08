import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../styles/update_employee_page.css";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(5, "Name should be at least 5 characters")
        .required("Name field is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email field is required"),

    phone_number: Yup.string()
        .min(10, "Phone number should be of 10 digits")
        .required("Phone number field is required"),

    status: Yup.string().required("Please select the status")
});

const EditEmployeeComponent = () => {
    const navigate = useNavigate();
    const notify = () => toast.success("Employee Updated", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    const [employeeData, setEmployeeData] = useState(null);
    let params = useParams();

    const handleUpdate = async(values) => {
        try{
            const updateEmployeeResponse = await axios.put(`http://localhost:5147/api/Employee/updateemployee/${params.id}`, values);
            
            // toast message function
            notify();

            // navigate after a delay
            setTimeout(() => {
                navigate("/employees");
            }, 3100);
        }catch(err){
            console.error("Error while updating", err);
        }
    };

    // first of all get the employee data and set in the input fields
    useEffect(() => {
        const getEmployeeDataById = async () => {
            try {
                const employeeDataResponse = await axios.get(`http://localhost:5147/api/employee/GetEmployeeById/${params.id}`);
                setEmployeeData(employeeDataResponse.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        getEmployeeDataById();
    }, [params.id]);

    useEffect(() => {
        if (employeeData) {
            console.log("Employee Data:", employeeData);
        }
    }, [employeeData]);



    return (
        <div className="edit-employee-form-container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                theme="light"
            />
            
            <h2 className="edit-employee-form-container-header">Edit Employee</h2>

            {employeeData ? (
                <Formik
                    initialValues={{
                        name: employeeData.name || '',
                        email: employeeData.email || '',
                        phone_number: employeeData.phone_number || '',
                        status: employeeData.status || ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                        handleUpdate(values);
                    }}
                >
                    <Form className="form">
                        <div className="input-container">
                            <label htmlFor="name">Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="input-field"
                                autoComplete="off"
                            />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                className="input-field"
                                autoComplete="off"
                            />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="phone_number">Phone Number</label>
                            <Field
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className="input-field"
                                autoComplete="off"
                            />
                            <ErrorMessage name="phone_number" component="div" className="error-message" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="status">Status</label>
                            <Field as="select" name="status" className="input-field">
                                <option value="">Select a status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="error-message" />
                        </div>

                        <button type="submit" className="edit-btn">Edit</button>
                    </Form>
                </Formik>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditEmployeeComponent;