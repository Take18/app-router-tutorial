import Head from "next/head";
import { use, useCallback } from "react";
import { DeleteButton } from "./components/deleteButton";
import { EditButton } from "./components/editButton";
import { Todo, getTodos } from "./contracts";
import { Search } from "./components/searchInput";
import { TodoList } from "./components/todoList";

const Todos = async () => {
  const todos = await getTodos();

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl">Todo</h1>
        <TodoList todos={todos} />
      </main>
    </>
  );
};

export default Todos;
