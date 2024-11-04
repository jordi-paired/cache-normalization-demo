import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

import { Todo } from "../types";
import { addTodos } from "@/cache/todosSlice";
const API_URL = "http://localhost:3001";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}/server/todos`);
  return response.data;
};

export const useQueryTodos = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = await fetchTodos();
      dispatch(addTodos(data));
      return data;
    },
  });
};
