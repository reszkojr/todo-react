import { createContext, useContext, useEffect, useState } from 'react';
import { fetchTodos } from '~/services/todo.service';
import type Todo from '~/types/Todo';

interface TodoContextProps {
	todos: Todo[];
    getTodos: () => Promise<void>;
	loading: boolean;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodo = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error('useTodo deve ser utilizado em um componente dentro de um TodoProvider');
	}

	return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = async () => {
		try {
			// TODO: create a getTodos service
			const response = await fetchTodos();

			setTodos(response.data);
		} catch (error) {
			console.log('Erro ao buscar todos: ', error);
		} finally {
			setLoading(false);
		}
	};

	return <TodoContext.Provider value={{ todos, getTodos, loading}}>{children}</TodoContext.Provider>;
};
