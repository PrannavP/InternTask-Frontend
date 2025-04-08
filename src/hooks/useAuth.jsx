import { useState, useEffect } from "react";
import { loadToken } from "../utils/authUtils";

const useAuth = () => {
    const [user, setUser] = useState(loadToken()); // Initialize with current token

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(loadToken()); // Update user when token changes
        };

        window.addEventListener("storage", handleStorageChange); // Listen for token changes
        return () => window.removeEventListener("storage", handleStorageChange); // Cleanup
    }, []);

    return user;
};

export default useAuth;