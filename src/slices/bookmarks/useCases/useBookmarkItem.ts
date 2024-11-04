import { useMutateBookmarkItem } from "../api/bookmarkItem";

export const useBookmarkItem = () => {
  const { mutate, isPending, isError } = useMutateBookmarkItem();

  return { bookmarkItem: mutate, isPending, isError };
};
