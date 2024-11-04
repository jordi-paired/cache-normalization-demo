import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Todo } from "../types";
import { addTodo } from "@/cache/todosSlice";
const API_URL = "http://localhost:3001";

export const fetchTodo = async (id: string): Promise<Todo> => {
  const response = await axios.get<Todo>(`${API_URL}/server/todos/${id}`);
  return response.data;
};

export const useQueryTodo = (id: string) => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["todo", id],
    queryFn: async () => {
      const todo = await fetchTodo(id);
      dispatch(addTodo(todo));
      return todo;
    },
  });
};
