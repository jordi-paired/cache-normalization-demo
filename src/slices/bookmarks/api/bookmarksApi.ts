import axios from "axios";

import { TodoDto } from "@/slices/todos/api/dtos/todoDto";

const API_URL = "http://localhost:3000";

export const fetchBookmarkedTodos = async (): Promise<TodoDto[]> => {
  const response = await axios.get<TodoDto[]>(`${API_URL}/todos`, {
    params: { isBookmarked: true },
  });
  return response.data;
};

export const bookmarkTodo = async (todoId: string): Promise<void> => {
  await axios.patch(`${API_URL}/todos/${todoId}`, { isBookmarked: true });
};

export const unbookmarkTodo = async (todoId: string): Promise<void> => {
  await axios.patch(`${API_URL}/todos/${todoId}`, { isBookmarked: false });
};
