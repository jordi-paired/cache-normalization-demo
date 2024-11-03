import { createSelector } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookmarkedTodos } from "../api/bookmarksApi";
import { addTodos, todosSelectors } from "@/cache/todosSlice";

export const useBookmarkedTodos = () => {
  const dispatch = useDispatch();

  const getBookmarkedTodos = async () => {
    const data = await fetchBookmarkedTodos();
    dispatch(addTodos(data));
    return data;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["bookmarkedTodos"],
    queryFn: getBookmarkedTodos,
  });

  const selectBookmarkedTodos = createSelector(
    todosSelectors.selectAll,
    (todos) => todos.filter((todo) => todo.isBookmarked),
  );

  const bookmarkedTodos = useSelector(selectBookmarkedTodos);

  return { bookmarkedTodos, isLoading, isError };
};
