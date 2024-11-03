import axios from "axios";

import { Todo } from "../types";

const API_URL = "http://localhost:3001";

export const fetchTodo = async (id: string): Promise<Todo> => {
  const response = await axios.get<Todo>(`${API_URL}/server/todos/${id}`);
  return response.data;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}/server/todos`);
  return response.data;
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = async (
  todo: Partial<Todo> & { id: string },
): Promise<Todo> => {
  const response = await axios.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo);
  return response.data;
};
