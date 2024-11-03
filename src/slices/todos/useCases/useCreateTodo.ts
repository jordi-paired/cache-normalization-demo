import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { createTodo } from "../api/todosApi";
import { addTodo } from "@/cache/todosSlice";

export const useCreateTodo = () => {
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      dispatch(addTodo(data));
    },
  });

  return { createTodo: mutate };
};
