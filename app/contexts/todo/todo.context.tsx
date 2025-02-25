import { createContext, useContext, useEffect, useState } from 'react';
import { createTodo as createTodoService, fetchTodos, updateTodo as updateTodoService, deleteTodo as deleteTodoService } from '~/services/todo.service';
import type Todo from '~/types/Todo';

interface TodoContextProps {
	todos: Todo[];
	getTodos: () => Promise<void>;
	updateTodoStatus: (todoId: number, status: 'pending' | 'in progress' | 'completed') => Promise<void>;
    updateTodo: (todo: Todo) => Promise<Todo>;
	createTodo: (todo: Todo) => Promise<Todo>;
	deleteTodo: (todo: Todo) => Promise<void>;
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
			throw new Error('Erro requisitando todos');
		} finally {
			setLoading(false);
		}
	};

	const createTodo = async (todo: Todo): Promise<Todo> => {
		try {
			const response = await createTodoService(todo);
			const newTodo = response.data;
			setTodos((prevTodos) => [...prevTodos, newTodo]);
			return newTodo;
		} catch (error) {
			throw new Error('Erro ao criar um novo todo');
		}
	};

	const updateTodoStatus = async (todoId: number, status: 'pending' | 'in progress' | 'completed') => {
		try {
			await updateTodoService(todoId, { status });
			setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? { ...todo, status } : todo)));
		} catch (error) {
			throw new Error('Erro ao atualizar o status do todo');
		}
	};

    const updateTodo = async (todo: Todo): Promise<Todo> => {
		try {
			const response = await updateTodoService(todo.id!, todo);
			setTodos((prevTodos) => prevTodos.map((t) => (t.id === todo.id ? todo : t)));
            return response;
		} catch (error) {
			throw new Error('Erro ao atualizar o status do todo');
		}
	};

	const deleteTodo = async (todo: Todo) => {
		try {
            console.log('deleteing todo', todo);
			await deleteTodoService(todo.id!);
			setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
		} catch (error) {
			throw new Error('Erro ao deletar o todo');
		}
	};

	return <TodoContext.Provider value={{ todos, getTodos, updateTodoStatus, createTodo, updateTodo, deleteTodo, loading }}>{children}</TodoContext.Provider>;
};
