import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../styles/admin_login.css"

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email field is required"),

    password: Yup.string()
        .min(5, "Password should be at least 6 characters")
        .required("Password field is required")
});

const AdminLoginPage = () => {
    const loginSuccessNotify = () => toast.success("Login Success", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    const errorNotify = () => toast.error("Error while logging in", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    const loginAdmin = async(values) => {
        try{
            const response = await axios.post("http://localhost:5147/api/Admin/Login", values);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);

                // show success toast message

                loginSuccessNotify();

                setTimeout(() => {
                    // go to employees page initially
                    window.location.href = "/employees";
                }, 2500);
            }
        }catch(err){
            errorNotify();
            console.log(err);
        }
    };

    return(
        <div className="admin-login-form-container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                theme="light"
            />

            <h2 className="admin-login-header">Admin Login</h2>

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    loginAdmin(values);
                }}
            >
                <Form className="form">
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="input-field"
                            autoComplete="off"
                        />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="input-field"
                            autoComplete="off"
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default AdminLoginPage;