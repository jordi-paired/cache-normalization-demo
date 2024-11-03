"use client";

import Link from "next/link";
import React from "react";

import { useBookmarkedTodos } from "../useCases/useBookmarkedTodos";

export const BookmarkedTodosList: React.FC = () => {
  const { bookmarkedTodos } = useBookmarkedTodos();

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
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bookmarked Todos</h1>
          <span className="text-yellow-500 text-2xl">⭐</span>
        </div>

        <div className="divide-y">
          {bookmarkedTodos.map((todo) => (
            <Link href={`/todos/${todo.id}`} key={todo.id}>
              <div className="py-4 px-2 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {todo.title}
                  </span>
                  <span className="text-yellow-500">⭐</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
