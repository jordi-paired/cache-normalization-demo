import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { useQueryBookmarks } from "../api/fetchBookmarks";
import { bookmarksSelectors } from "@/cache/bookmarksSlice";
import { todosSelectors } from "@/cache/todosSlice";
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

export const useBookmarks = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useQueryBookmarks();

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
