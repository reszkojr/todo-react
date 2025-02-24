import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigator = useNavigate();
    let isAuthenticated;

    useEffect(() => {
        isAuthenticated = localStorage.getItem(`auth-tokens-${import.meta.env.NODE_ENV}`) || false;
        if (!isAuthenticated) {
            navigator('/auth/login')
        }
    }, []);

    return <>{children}</>
}

export default ProtectedRoute;