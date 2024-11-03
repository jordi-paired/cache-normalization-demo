import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import { fetchTodo } from "../api/todosApi";
import { todosSelectors, upsertTodo } from "@/cache/todosSlice";
import { RootState } from "@/core/redux";

export const useTodoDetail = (id: string) => {
  const dispatch = useDispatch();

  const getTodo = async () => {
    const data = await fetchTodo(id);
    dispatch(upsertTodo(data));
    return data;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });

  const todo = useSelector((state: RootState) =>
    todosSelectors.selectById(state, id),
  );

  return { isLoading, isError, todo };
};
