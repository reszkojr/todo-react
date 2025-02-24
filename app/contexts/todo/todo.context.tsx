import { createContext, useContext, useEffect, useState } from 'react';
import { fetchTodos, updateTodo } from '~/services/todo.service';
import type Todo from '~/types/Todo';

interface TodoContextProps {
	todos: Todo[];
	getTodos: () => Promise<void>;
	updateTodoStatus: (todo: Todo, status: 'pending' | 'in progress' | 'completed') => Promise<void>;
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
			const response = await fetchTodos();

			setTodos(response.data);
		} catch (error) {
			console.log('Erro ao buscar todos: ', error);
		} finally {
			setLoading(false);
		}
	};

	const updateTodoStatus = async (todo: Todo, status: 'pending' | 'in progress' | 'completed') => {
		try {
			await updateTodo(todo.id, { status });
		} catch (error) {
			throw new Error('Erro ao atualizar o status do todo');
		}
	};

	return <TodoContext.Provider value={{ todos, getTodos, updateTodoStatus, loading }}>{children}</TodoContext.Provider>;
};
