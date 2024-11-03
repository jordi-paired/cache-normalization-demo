import axios from "axios";

import { Bookmark } from "../types";

const API_URL = "http://localhost:3001";

export const fetchBookmarks = async (page: number, limit: number) => {
  const response = await axios.get<Bookmark[]>(`${API_URL}/server/bookmarks`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

export const bookmarkItem = async (data: {
  itemType: "todo";
  id: string;
}): Promise<Bookmark> => {
  const response = await axios.post<Bookmark>(`${API_URL}/bookmarks`, data);
  return response.data;
};

export const unbookmarkItem = async (bookmarkId: string): Promise<void> => {
  await axios.delete(`${API_URL}/bookmarks/${bookmarkId}`);
};
