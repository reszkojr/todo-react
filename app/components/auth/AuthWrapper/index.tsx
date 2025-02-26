import { Outlet } from 'react-router';
import { AuthProvider } from '~/contexts/auth/auth.context';

export default function AuthWrapper() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}
