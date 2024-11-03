"use client";

import Link from "next/link";
import React from "react";

import { useBookmarks } from "../useCases/useBookmarks";

export const BookmarkedTodosList: React.FC = () => {
  const {
    bookmarks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useBookmarks();

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

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
        </div>

        <div className="divide-y">
          {bookmarks.map((item) => (
            <Link href={`/todos/${item.id}`} key={item.id}>
              <div className="py-4 px-2 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.item?.title}
                  </span>
                  <span className="text-yellow-500">⭐</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-4 w-full py-2 px-4 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};
