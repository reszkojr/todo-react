import { Outlet } from 'react-router';
import { TodoProvider } from '~/contexts/todo.context';

export default function TodoWrapper() {
	return (
		<TodoProvider>
			<Outlet />
		</TodoProvider>
	);
}
