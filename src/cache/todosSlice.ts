import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { RootState } from "@/core/redux";
import { Todo } from "@/slices/todos/types";

const todosAdapter = createEntityAdapter<Todo>();

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodos: todosAdapter.upsertMany,
    addTodo: todosAdapter.upsertOne,
    updateTodo: todosAdapter.updateOne,
    removeTodo: todosAdapter.removeOne,
  },
});

export const { addTodos, addTodo, updateTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;

export const todosSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todos,
);
