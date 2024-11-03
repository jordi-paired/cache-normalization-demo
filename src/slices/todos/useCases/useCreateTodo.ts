import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { addTodos, removeTodo } from "../../../cache/todosSlice";
import { TodoDto } from "../api/dtos/todoDto";
import { createTodo } from "../api/todosApi";

export const useCreateTodo = () => {
  const dispatch = useDispatch();

  const {
    mutate: createTodoMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createTodo,
    onMutate: (newTodo: Omit<TodoDto, "id">) => {
      const tempId = Date.now() + "";
      const tempTodo = { ...newTodo, id: tempId };
      dispatch(addTodos([tempTodo]));
      return { tempId };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.tempId) dispatch(removeTodo(context?.tempId));
    },
    onSuccess: (data: TodoDto, newTodo, context) => {
      dispatch(removeTodo(context?.tempId));
      dispatch(addTodos([data]));
    },
  });

  return { createTodo: createTodoMutation, isLoading: isPending, isError };
};
