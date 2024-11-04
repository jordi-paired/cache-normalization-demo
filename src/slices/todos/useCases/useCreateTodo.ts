import { useMutationCreateTodo } from "../api/createTodo";

export const useCreateTodo = () => {
  const { mutate } = useMutationCreateTodo();
  return { createTodo: mutate };
};
