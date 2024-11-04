import { useMutationUpdateTodo } from "../api/updateTodo";

export const useUpdateTodo = () => {
  const { mutate } = useMutationUpdateTodo();

  return { updateTodo: mutate };
};
