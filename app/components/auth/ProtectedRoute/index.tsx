import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/contexts/auth/auth.context';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
        }
    }, []);

    if (isAuthenticated) {
        return <Outlet />;
    }

    return null;
};

export default ProtectedRoute;