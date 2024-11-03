"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { useTodoDetail } from "../useCases/useTodoDetail";
import { useUpdateTodo } from "../useCases/useUpdateTodo";
import { useBookmarkItem } from "@/slices/bookmarks/useCases/useBookmarkItem";
import { useUnbookmarkItem } from "@/slices/bookmarks/useCases/useUnbookmarkItem";

export const TodoDetailPage: React.FC = () => {
  const params = useParams();
  const todoId = `${params.id}`;

  const { todo, isLoading } = useTodoDetail(todoId);
  const { bookmarkItem } = useBookmarkItem();
  const { unbookmarkItem } = useUnbookmarkItem();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState("");
  const { updateTodo } = useUpdateTodo();

  if (isLoading) return <div>Loading...</div>;

  const handleEditClick = () => {
    setEditedTitle(todo.title);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTodo({ id: todo.id, title: editedTitle });
    setIsEditing(false);
  };

  const toggleBookmark = () => {
    if (todo.isBookmarked) {
      unbookmarkItem({ id: todo.id, itemType: "todo" });
    } else {
      bookmarkItem({ id: todo.id, itemType: "todo" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            ← Back to Todos
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          {isEditing ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl font-bold text-gray-800 border rounded px-2 py-1"
                autoFocus
              />
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-bold text-gray-800">{todo.title}</h1>
              <button
                onClick={handleEditClick}
                className="text-gray-500 hover:text-gray-700"
              >
                ✎
              </button>
            </div>
          )}
          <button
            onClick={toggleBookmark}
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2
              ${
                todo.isBookmarked
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {todo.isBookmarked ? "⭐ Bookmarked" : "☆ Bookmark"}
          </button>
        </div>

        {todo.description && (
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 leading-relaxed">{todo.description}</p>
          </div>
        )}

        <div className="flex gap-4 mt-8 pt-6">
          <Link href="/bookmarks">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors">
              View Bookmarks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
