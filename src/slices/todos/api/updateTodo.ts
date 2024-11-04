import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Todo } from "../types";
import { updateTodo as updateTodoCache } from "@/cache/todosSlice";

const API_URL = "http://localhost:3001";

export const updateTodo = async (
  todo: Partial<Todo> & { id: string },
): Promise<Todo> => {
  const response = await axios.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo);
  return response.data;
};

export const useMutationUpdateTodo = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo: Partial<Todo> & { id: string }) => {
      dispatch(updateTodoCache({ id: updatedTodo.id, changes: updatedTodo }));
    },
  });
};
