import { jwtDecode } from "jwt-decode";

export const loadToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found");
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token"); // Clear the expired token
            return null;
        }

        return decodedToken; // Return the decoded token as the user object
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export const isAuthenticated = () => {
    return loadToken() !== null;
};