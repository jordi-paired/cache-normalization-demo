import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { unbookmarkTodo } from "../api/bookmarksApi";
import { updateTodo } from "@/cache/todosSlice";

export const useUnbookmarkTodo = () => {
  const dispatch = useDispatch();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: unbookmarkTodo,
    onMutate: (todoId: string) => {
      dispatch(updateTodo({ id: todoId, changes: { isBookmarked: false } }));
    },
    onError: (err, todoId: string) => {
      dispatch(updateTodo({ id: todoId, changes: { isBookmarked: true } }));
    },
  });

  return { unbookmarkTodo: mutate, isPending, isError };
};
