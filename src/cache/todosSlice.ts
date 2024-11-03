import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { Todo } from "../slices/todos/domain/types";
import { RootState } from "@/core/redux";

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: todosAdapter.upsertMany,
    updateTodo: todosAdapter.updateOne,
    upsertTodo: todosAdapter.upsertOne,
    removeTodo: todosAdapter.removeOne,
  },
});

export const { addTodos, updateTodo, upsertTodo, removeTodo } =
  todosSlice.actions;
export default todosSlice.reducer;

export const todosSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todos,
);
