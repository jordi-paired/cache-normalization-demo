import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { RootState } from "@/core/redux";
import { Bookmark, NormalizedBookmark } from "@/slices/bookmarks/types";

const bookmarksAdapter = createEntityAdapter<NormalizedBookmark>();

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: bookmarksAdapter.getInitialState(),
  reducers: {
    addBookmarks: {
      reducer: bookmarksAdapter.upsertMany,
      // Normalizes data
      prepare: (bookmarks: Bookmark[]) => {
        const normalizedBookmarks = bookmarks.map(({ id, itemType }) => ({
          id,
          itemType,
        }));
        return { payload: normalizedBookmarks };
      },
    },
    addBookmark: {
      reducer: bookmarksAdapter.addOne,
      // Normalizes data
      prepare: (bookmark: Bookmark) => {
        return { payload: { id: bookmark.id, itemType: bookmark.itemType } };
      },
    },
    removeBookmark: bookmarksAdapter.removeOne,
  },
});

export const { addBookmarks, addBookmark, removeBookmark } =
  bookmarksSlice.actions;
export default bookmarksSlice.reducer;

export const bookmarksSelectors = bookmarksAdapter.getSelectors<RootState>(
  (state) => state.bookmarks,
);
