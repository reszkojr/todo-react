import React, { createContext, useContext, useState } from 'react';
import { login, logout, register } from '~/services/auth.service';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleLogin = async (email: string, password: string) => {
        await login({ email, password });
        setIsAuthenticated(true);
    };

    const handleRegister = async (email: string, password: string, username: string) => {
        await register({ email, password, username });
        setIsAuthenticated(true);
    };

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, register: handleRegister, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};