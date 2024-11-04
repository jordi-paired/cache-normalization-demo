import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Bookmark } from "../types";
import { addBookmarks } from "@/cache/bookmarksSlice";
import { addTodos } from "@/cache/todosSlice";

const API_URL = "http://localhost:3001";
const PAGE_LIMIT = 3;

export const fetchBookmarks = async (page: number, limit: number) => {
  const response = await axios.get<Bookmark[]>(`${API_URL}/server/bookmarks`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

export const useQueryBookmarks = () => {
  const dispatch = useDispatch();

  return useInfiniteQuery({
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
};
