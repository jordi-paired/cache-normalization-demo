"use client";

import Link from "next/link";
import React, { useState } from "react";

import { useCreateTodo } from "../useCases/useCreateTodo";
import { useTodoList } from "../useCases/useTodoList";

const TodoListPage: React.FC = () => {
  const { isLoading, isError, todos } = useTodoList();
  const [title, setTitle] = useState("");
  const { createTodo } = useCreateTodo();

  console.log({ todos });

  const onCreate = () => {
    createTodo({ title, description: "", isBookmarked: false });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todos.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">My Todos</h1>
        <Link href="/bookmarks">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
            View Bookmarks
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8 flex gap-4 items-center flex-row">
        <input
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors w-fit"
        >
          Create
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {todos.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id}>
            <div className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <span className="font-medium">{todo.title}</span>
              {todo.isBookmarked && (
                <span className="ml-2 text-yellow-500">⭐</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TodoListPage;
