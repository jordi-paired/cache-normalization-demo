import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Todo } from "../types";
import { addTodo } from "@/cache/todosSlice";
const API_URL = "http://localhost:3001";

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, todo);
  return response.data;
};

export const useMutationCreateTodo = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      dispatch(addTodo(data));
    },
  });
};
