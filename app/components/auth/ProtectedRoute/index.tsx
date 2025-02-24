import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

const ProtectedRoute = () => {
    const navigator = useNavigate();

    let isAuthenticated;

    useEffect(() => {        
        isAuthenticated = localStorage.getItem(`auth-tokens-${process.env.NODE_ENV}`) || false;
        if (!isAuthenticated) {
            navigator('/auth/login')
        }
    }, []);

    return <Outlet />
}

export default ProtectedRoute;