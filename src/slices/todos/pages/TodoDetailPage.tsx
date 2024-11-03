"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { useTodoDetail } from "../useCases/useTodoDetail";
import { useBookmarkTodo } from "@/slices/bookmarks/useCases/useBookmarkTodo";
import { useUnbookmarkTodo } from "@/slices/bookmarks/useCases/useUnbookmarkTodo";

export const TodoDetailPage: React.FC = () => {
  const params = useParams();
  const todoId = `${params.id}`;

  const { todo, isLoading } = useTodoDetail(todoId);
  const { bookmarkTodo } = useBookmarkTodo();
  const { unbookmarkTodo } = useUnbookmarkTodo();

  if (isLoading) return <div>Loading...</div>;

  const toggleBookmark = () => {
    if (todo.isBookmarked) {
      unbookmarkTodo(todo.id);
    } else {
      bookmarkTodo(todo.id);
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
          <h1 className="text-2xl font-bold text-gray-800">{todo.title}</h1>
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
