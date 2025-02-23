import { layout, route } from '@react-router/dev/routes';

export default [
    route('auth/register', 'routes/auth/register.tsx'),
    route('auth/login', 'routes/auth/login.tsx'),
    layout('components/todos/TodoWrapper/index.tsx', [
        route('todos/', 'routes/todos/todos.tsx')
    ]),
];
