import { api } from "~/api";
import type Todo from "~/types/Todo";

interface FetchTodosResponse {
    data: Todo[];
}

export const fetchTodos = async (): Promise<FetchTodosResponse> => {
    return await api.get(`/api/todos`);
}