import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { TodoProvider, useTodo } from '~/contexts/todo/todo.context';

export default function TodoWrapper() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); 

        const handleResize = () => {
            if (mediaQuery.matches && location.pathname === '/todos/view/columns') {
                navigate('/todos/view/sidebar');
            }
        };

        handleResize();
        mediaQuery.addEventListener('change', handleResize);
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, [location, navigate]);

    return (
        <TodoProvider>
            <Outlet />
        </TodoProvider>
    );
}
