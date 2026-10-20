import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/api/authApi";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => { 
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            const res = await getCurrentUser({headers: { Authorization: `Bearer ${token}` }});
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, fetchUser, logout, loading }}>
            {!loading && children} {/* Jab tak loading ho, kuch mat dikhana */}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
