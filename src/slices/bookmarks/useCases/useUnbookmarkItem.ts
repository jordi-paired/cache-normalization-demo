import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { unbookmarkItem } from "../api/bookmarksApi";
import { removeBookmark } from "@/cache/bookmarksSlice";
import { updateTodo } from "@/cache/todosSlice";

export const useUnbookmarkItem = () => {
  const dispatch = useDispatch();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ id }: { id: string }) => unbookmarkItem(id),
    onSuccess: (_, { id, itemType }: { id: string; itemType: "todo" }) => {
      dispatch(removeBookmark(id));
      if (itemType === "todo") {
        dispatch(updateTodo({ id, changes: { isBookmarked: false } }));
      }
    },
  });

  return { unbookmarkItem: mutate, isPending, isError };
};
