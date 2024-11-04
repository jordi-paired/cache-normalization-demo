import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { removeBookmark } from "@/cache/bookmarksSlice";
import { updateTodo } from "@/cache/todosSlice";

const API_URL = "http://localhost:3001";

export const unbookmarkItem = async (bookmarkId: string): Promise<void> => {
  await axios.delete(`${API_URL}/bookmarks/${bookmarkId}`);
};

export const useMutateUnbookmarkItem = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => unbookmarkItem(id),
    onSuccess: (_, { id, itemType }: { id: string; itemType: "todo" }) => {
      dispatch(removeBookmark(id));
      if (itemType === "todo") {
        dispatch(updateTodo({ id, changes: { isBookmarked: false } }));
      }
    },
  });
};
