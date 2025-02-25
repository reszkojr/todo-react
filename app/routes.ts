import { layout, route } from '@react-router/dev/routes';

export default [
    route('auth/register', 'routes/auth/register.tsx'),
    route('auth/login', 'routes/auth/login.tsx'),
    layout('components/auth/ProtectedRoute/index.tsx', [
        layout('components/todos/TodoWrapper/index.tsx', [
            layout('components/todos/Sidebar/index.tsx', [
                route('todos/view/sidebar', 'routes/todos/views/sidebar.tsx'),
            ]),
            route('todos/view/columns', 'routes/todos/views/columns.tsx')
        ]),
    ])
];
