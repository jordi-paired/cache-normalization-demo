"use client";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { addTodos, todosSelectors } from "../../../cache/todosSlice";
import { fetchTodos } from "../api/todosApi";

export const useTodoList = () => {
  const dispatch = useDispatch();

  const getTodos = async () => {
    const data = await fetchTodos();
    dispatch(addTodos(data));
    return data;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const todos = useSelector(todosSelectors.selectAll);

  return { isLoading, isError, todos };
};
