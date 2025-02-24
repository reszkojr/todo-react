import { createContext, useContext, useEffect, useState } from 'react';
import { createNewTodo, fetchTodos, updateTodo } from '~/services/todo.service';
import type Todo from '~/types/Todo';

interface TodoContextProps {
	todos: Todo[];
	getTodos: () => Promise<void>;
	updateTodoStatus: (todoId: number, status: 'pending' | 'in progress' | 'completed') => Promise<void>;
    createTodo: (todo: Todo) => Promise<Todo>;
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
            const response = await createNewTodo(todo);
            const newTodo = response.data
			setTodos((prevTodos) => [...prevTodos, newTodo]);
            return newTodo;
        } catch (error) {
            throw new Error('Erro ao criar um novo todo');
        }
    };

	const updateTodoStatus = async (todoId: number, status: 'pending' | 'in progress' | 'completed') => {
		try {
			await updateTodo(todoId, { status });
		} catch (error) {
			throw new Error('Erro ao atualizar o status do todo');
		}
	};

    return <TodoContext.Provider value={{ todos, getTodos, updateTodoStatus, createTodo, loading }}>{children}</TodoContext.Provider>;
};
