"use client";

import { useEffect, useState } from "react";
import { Todo, getTodos } from "../_contracts";
import { DeleteButton } from "./deleteButton";
import { EditButton } from "./editButton";
import { Search } from "./searchInput";
import { useSearchParams } from "next/navigation";

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos: givenTodos }: Props) => {
  const isUpdated = (todo: Todo) => {
    return todo.createdAt.toISOString() !== todo.updatedAt.toISOString();
  };

  const [todos, setTodos] = useState<Todo[]>(givenTodos);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const abortController = new AbortController();
    getTodos({ signal: abortController.signal })
      .then((todos) => setTodos(todos))
      .catch((e) => console.error(e));

    return () => abortController.abort();
  }, [searchQuery]);

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex w-4/5 flex-col gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex w-full items-center justify-between"
          >
            <p>
              {todo.title}
              {isUpdated(todo) && (
                <span className="text-sm text-gray-400">(Edited)</span>
              )}
            </p>
            <div className="flex w-44 justify-between">
              <DeleteButton todo={todo} />
              <EditButton todo={todo} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
