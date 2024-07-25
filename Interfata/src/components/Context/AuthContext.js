import React, { createContext, useContext, useState } from 'react';
import {getDatabase} from "firebase/database";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const database = getDatabase();
    const saveUserDataToLocal = (userData) => {
        localStorage.setItem('user_data', JSON.stringify(userData));
    };

    const login = async (userData) => {
        // Actualizare utilizator curent si stocare locala
        setCurrentUser(userData);
        saveUserDataToLocal(userData);
        console.log('Autentificare reușită!');
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user_data');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};