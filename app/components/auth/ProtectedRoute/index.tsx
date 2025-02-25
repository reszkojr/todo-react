import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

const ProtectedRoute = () => {
	const navigator = useNavigate();
	const location = useLocation();

	let isAuthenticated;

	useEffect(() => {
		isAuthenticated = localStorage.getItem(`auth-tokens-${process.env.NODE_ENV}`) || false;
		if (!isAuthenticated) {
			navigator('/auth/login');
		}
	}, [location]);

	if (isAuthenticated) {
		return <Outlet />;
	}
};

export default ProtectedRoute;
