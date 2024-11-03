import { configureStore } from "@reduxjs/toolkit";

import bookmarksReducer from "@/cache/bookmarksSlice";
import todosReducer from "@/cache/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
