import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const navigate = useNavigate();
    
    const loginAdmin = async(values) => {
        try{
            const response = await axios.post("http://localhost:5147/api/Admin/Login", values);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                console.log("ok logged in");
                navigate("/");
                console.log("navigating to /");
            }
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="admin-login-form-container">
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