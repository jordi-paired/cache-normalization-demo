import { Todo } from "@/slices/todos/types";

export interface Bookmark {
  id: string;
  itemType: "todo";
  item: Todo;
}

export interface NormalizedBookmark {
  id: string;
  itemType: "todo";
}
