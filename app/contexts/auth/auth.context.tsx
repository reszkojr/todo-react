import React, { createContext, useContext, useState } from 'react';
import { login, logout, register } from '~/services/auth.service';
import { decodeToken } from 'react-jwt'

interface User {
    id: string;
    email: string;
    username: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = async (email: string, password: string) => {
        const response = await login({ email, password });
        const { accessToken } = response;

        const decodedToken = decodeToken(accessToken) as User;
        setIsAuthenticated(true);
        setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            username: decodedToken.username,
        });
    };

    const handleRegister = async (email: string, password: string, username: string) => {
        return await register({ email, password, username });
    };

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login: handleLogin, register: handleRegister, logout: handleLogout }}>
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