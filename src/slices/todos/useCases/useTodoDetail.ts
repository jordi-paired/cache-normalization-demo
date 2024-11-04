import { useSelector } from "react-redux";

import { useQueryTodo } from "../api/fetchTodo";
import { todosSelectors } from "@/cache/todosSlice";
import { RootState } from "@/core/redux";

export const useTodoDetail = (id: string) => {
  const { isLoading, isError } = useQueryTodo(id);

  const todo = useSelector((state: RootState) =>
    todosSelectors.selectById(state, id),
  );

  return { isLoading, isError, todo };
};
