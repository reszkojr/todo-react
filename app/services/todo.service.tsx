import { api } from "~/api";
import type Todo from "~/types/Todo";

interface FetchTodosResponse {
    data: Todo[];
}

interface CreateTodoResponse {
    data: Todo;
}

export const fetchTodos = async (): Promise<FetchTodosResponse> => {
    return await api.get(`/api/todos`);
}

export const updateTodo = async (id: number, params: Partial<Todo>): Promise<Todo> => {
    return await api.put(`/api/todos/${id}`, params);
}

export const createNewTodo = async (todo: Todo): Promise<CreateTodoResponse> => {
    return await api.post(`/api/todos`, todo);
}