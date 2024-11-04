import { useSelector } from "react-redux";

import { useQueryTodos } from "../api/fetchTodos";
import { todosSelectors } from "@/cache/todosSlice";

export const useTodoList = () => {
  const { isLoading, isError } = useQueryTodos();

  const todos = useSelector(todosSelectors.selectAll);

  return { todos, isLoading, isError };
};
