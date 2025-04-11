import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeesListPage from "./pages/EmployeesListPage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AttendacePage from "./pages/AttendancePage";
import ItemPage from "./pages/ItemsPage";

import { AdminContext } from "./context/adminContext";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import PurchaseItemPage from "./pages/PurchaseItemPage";
import ItemsListPage from "./pages/ItemsListPage";
import AssignItemsPage from "./pages/AssignItemsPage";
import AssignedItemsPage from "./pages/AssignedItemsPage";
import UpdateAssignedItemPage from "./pages/UpdateAssignedItemPage";

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
                        path="/"
                        element={
                            admin ? <Navigate to="/employees" /> : <AdminLoginPage />
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                        admin ? <EmployeesListPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/create-employee"
                        element={
                            admin ? <CreateEmployeePage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/update-employee/:id"
                        element={
                            admin ? <UpdateEmployeePage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/attendance"
                        element={
                            admin ? <AttendacePage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/items"
                        element={
                            admin ? <ItemPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/purchase-item"
                        element={
                            admin ? <PurchaseItemPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/items-list"
                        element={
                            admin ? <ItemsListPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/assign-items"
                        element={
                            admin ? <AssignItemsPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/assigned-items-list"
                        element={
                            admin ? <AssignedItemsPage /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/assigned-items/:id"
                        element={
                            admin ? <UpdateAssignedItemPage /> : <Navigate to="/" />
                        }
                    />
                </Routes>
            </Router>
        </AdminContext.Provider>
    );
};

export default App;