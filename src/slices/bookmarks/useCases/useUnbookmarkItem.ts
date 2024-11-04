import { useMutateUnbookmarkItem } from "../api/unbookmarkItem";

export const useUnbookmarkItem = () => {
  const { mutate, isPending, isError } = useMutateUnbookmarkItem();

  return { unbookmarkItem: mutate, isPending, isError };
};
