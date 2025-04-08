import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeesListPage from "./pages/EmployeesListPage";
import DashboardPage from "./pages/DashboardPage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AttendacePage from "./pages/AttendancePage";
import ItemPage from "./pages/ItemsPage";

import { AdminContext } from "./context/adminContext";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

const App = () => {
    const authAdmin = useAuth();
    const [admin, setAdmin] = useState(authAdmin);

    useEffect(() => {
        setAdmin(authAdmin);
    }, [authAdmin]);

    return (
        <AdminContext.Provider value={admin}>
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            admin ? <Navigate to="/" /> : <AdminLoginPage />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            admin ? <DashboardPage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                        admin ? <EmployeesListPage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/create-employee"
                        element={
                            admin ? <CreateEmployeePage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/update-employee/:id"
                        element={
                            admin ? <UpdateEmployeePage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/attendance"
                        element={
                            admin ? <AttendacePage /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/items"
                        element={
                            admin ? <ItemPage /> : <Navigate to="/login" />
                        }
                    />
                </Routes>
            </Router>
        </AdminContext.Provider>
    );
};

export default App;