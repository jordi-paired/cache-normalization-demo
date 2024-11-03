import axios from "axios";

import { TodoDto } from "./dtos/todoDto";

const API_URL = "http://localhost:3000";

export const fetchTodos = async (): Promise<TodoDto[]> => {
  const response = await axios.get<TodoDto[]>(`${API_URL}/todos`);
  return response.data;
};

export const fetchTodo = async (id: string): Promise<TodoDto> => {
  const response = await axios.get<TodoDto>(`${API_URL}/todos/${id}`);
  return response.data;
};

export const createTodo = async (
  todo: Omit<TodoDto, "id">,
): Promise<TodoDto> => {
  const response = await axios.post<TodoDto>(`${API_URL}/todos`, todo);
  return response.data;
};
