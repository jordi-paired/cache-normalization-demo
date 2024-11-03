import { createSelector } from "@reduxjs/toolkit";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookmarks } from "../api/bookmarksApi";
import { addBookmarks, bookmarksSelectors } from "@/cache/bookmarksSlice";
import { addTodos, todosSelectors } from "@/cache/todosSlice";
import { RootState } from "@/core/redux";

const selectDenormalizedBookmarks = createSelector(
  [(state: RootState) => state, bookmarksSelectors.selectAll],
  (state, bookmarks) => {
    return bookmarks.map((bookmark) => {
      const item =
        bookmark.itemType === "todo"
          ? todosSelectors.selectById(state, bookmark.id)
          : null;
      return { ...bookmark, item };
    });
  },
);

const PAGE_LIMIT = 3;

export const useBookmarks = () => {
  const dispatch = useDispatch();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["bookmarks"],
      queryFn: async ({ pageParam = 1 }) => {
        const data = await fetchBookmarks(pageParam, PAGE_LIMIT);
        dispatch(addBookmarks(data));

        const todos = data
          .filter((bookmarkItem) => bookmarkItem.itemType === "todo")
          .map((bookmarkItem) => bookmarkItem.item);
        dispatch(addTodos(todos));
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === PAGE_LIMIT ? allPages.length + 1 : undefined;
      },
    });

  const denormalizedBookmarks = useSelector(selectDenormalizedBookmarks);

  return {
    bookmarks: denormalizedBookmarks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
};
