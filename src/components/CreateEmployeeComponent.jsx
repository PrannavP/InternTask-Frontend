import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/create_employee_page.css';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(5, "Name should be at least 5 characters")
        .required("Name field is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email field is required"),

    phone_number: Yup.string()
        .min(10, "Phone number should be of 10 digits")
        .required("Phone number field is required")
});

const CreateEmployeeComponent = () => {
    const navigate = useNavigate();
    const notify = () => toast.success('Employee Created!', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
    });

    const createEmployeeFnc = async (values) => {
        try {
            const response = await axios.post("http://localhost:5147/api/employee/createemployee", values);
            console.log(response);

            // Display popup message
            notify();

            // Navigate after a delay
            setTimeout(() => {
                navigate('/employees');
            }, 3000);
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    return (
        <div className="create-employee-form-container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                theme="light"
            />

            <h2 className="create-employee-form-container-header">Create New Employee</h2>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone_number: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    createEmployeeFnc(values);
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

                    <button type="submit" className="create-btn">Create</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateEmployeeComponent;