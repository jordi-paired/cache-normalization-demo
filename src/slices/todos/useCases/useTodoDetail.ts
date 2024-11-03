import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { fetchTodo } from "../api/todosApi";
import { todosSelectors, addTodo } from "@/cache/todosSlice";
import { RootState } from "@/core/redux";

export const useTodoDetail = (id: string) => {
  const dispatch = useDispatch();

  const { isLoading, isError } = useQuery({
    queryKey: ["todo", id],
    queryFn: async () => {
      const todo = await fetchTodo(id);
      dispatch(addTodo(todo));
      return todo;
    },
  });

  const todo = useSelector((state: RootState) =>
    todosSelectors.selectById(state, id),
  );

  return { isLoading, isError, todo };
};
