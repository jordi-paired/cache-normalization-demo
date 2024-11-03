import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { updateTodo as updateTodoApi } from "../api/todosApi";
import { Todo } from "../types";
import { updateTodo } from "@/cache/todosSlice";

export const useUpdateTodo = () => {
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: updateTodoApi,
    onMutate: async (updatedTodo: Partial<Todo> & { id: string }) => {
      dispatch(updateTodo({ id: updatedTodo.id, changes: updatedTodo }));
    },
  });

  return { updateTodo: mutate };
};
