import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { bookmarkTodo } from "../api/bookmarksApi";
import { updateTodo } from "@/cache/todosSlice";

export const useBookmarkTodo = () => {
  const dispatch = useDispatch();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: bookmarkTodo,
    onMutate: (todoId: string) => {
      dispatch(updateTodo({ id: todoId, changes: { isBookmarked: true } }));
    },
    onError: (err, todoId: string) => {
      dispatch(updateTodo({ id: todoId, changes: { isBookmarked: false } }));
    },
  });

  return { bookmarkTodo: mutate, isPending, isError };
};
