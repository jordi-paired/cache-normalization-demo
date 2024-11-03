import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { bookmarkItem } from "../api/bookmarksApi";
import { addBookmarks } from "@/cache/bookmarksSlice";
import { updateTodo } from "@/cache/todosSlice";

export const useBookmarkItem = () => {
  const dispatch = useDispatch();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ itemType, id }: { itemType: "todo"; id: string }) =>
      bookmarkItem({ itemType, id }),
    onSuccess: (data, { itemType, id }) => {
      dispatch(addBookmarks([data]));
      if (itemType === "todo") {
        dispatch(updateTodo({ id, changes: { isBookmarked: true } }));
      }
    },
  });

  return { bookmarkItem: mutate, isPending, isError };
};
