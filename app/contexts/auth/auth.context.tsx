import React, { createContext, useContext, useState } from 'react';
import { login, logout, register } from '~/services/auth.service';
import { decodeToken } from 'react-jwt'
import { useEffect } from 'react';
import { getAccessToken } from 'axios-jwt';

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
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getAccessToken();

            if (token != undefined && token != null) {
                const decodedToken = decodeToken(token) as User;
                if (!decodedToken) return;

                setIsAuthenticated(true);
                setUser({
                    id: decodedToken.id,
                    email: decodedToken.email,
                    username: decodedToken.username,
                });
            }
            setLoading(false);
        };

        fetchToken();
    }, []);


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

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="animate-spin inline-block size-12 border-[5px] border-current border-t-transparent text-teal-600 rounded-full" role="status" aria-label="loading">
                </div>
            </div>
        );
    }

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