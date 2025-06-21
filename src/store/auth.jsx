import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const API = "http://localhost:5000";
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setIsAdmin] = useState(false);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        setIsAdmin(false);
        localStorage.removeItem('token');
    };

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsAdmin(data.userData.isAdmin);
            } else {
                setUser(null); // Ensure user is set to null on failed response
            }
        } catch (error) {
            toast.error("Error fetching the user data: ", error);
            setUser(null); // Ensure user is set to null on error
        } finally {
            setIsLoading(false);
        }
    };

    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setServices(data.msg);
            }
        } catch (error) {
            toast.error(`Server Error: ${error}`);
        }
    };

    useEffect(() => {
        getServices();
        userAuthentication();
    }, [authorizationToken]);

    return (
        <AuthContext.Provider value={{
            storeTokenInLS, LogoutUser, isLoggedIn: !!token, user, services,
            authorizationToken, isLoading, API, token, admin, userAuthentication
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
