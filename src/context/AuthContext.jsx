import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                console.log("check authStatus");
                const status = await authService.isAuthenticated();
                console.log("checked authStatus", status);

                setIsAuthenticated(status);
            } catch (error) {
                console.error("Auth status check failed:", error);
                setIsAuthenticated(false);
            }
        };
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthChecker = () => {
    return useContext(AuthContext);
};
