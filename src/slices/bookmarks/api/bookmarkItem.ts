import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Bookmark } from "../types";
import { addBookmarks } from "@/cache/bookmarksSlice";
import { updateTodo } from "@/cache/todosSlice";

const API_URL = "http://localhost:3001";

export const bookmarkItem = async (data: {
  itemType: "todo";
  id: string;
}): Promise<Bookmark> => {
  const response = await axios.post<Bookmark>(`${API_URL}/bookmarks`, data);
  return response.data;
};

export const useMutateBookmarkItem = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ itemType, id }: { itemType: "todo"; id: string }) =>
      bookmarkItem({ itemType, id }),
    onSuccess: (data, { itemType, id }) => {
      dispatch(addBookmarks([data]));
      if (itemType === "todo") {
        dispatch(updateTodo({ id, changes: { isBookmarked: true } }));
      }
    },
  });
};
