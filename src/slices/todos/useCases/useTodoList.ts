import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { fetchTodos } from "../api/todosApi";
import { addTodos, todosSelectors } from "@/cache/todosSlice";

export const useTodoList = () => {
  const dispatch = useDispatch();

  const { isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = await fetchTodos();
      dispatch(addTodos(data));
      return data;
    },
  });

  const todos = useSelector(todosSelectors.selectAll);

  return { todos, isLoading, isError };
};
