import { createContract } from "@/app/router";
import { z } from "zod";

export type Todo = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export const getTodos = async ({}: {
  signal?: AbortSignal;
} = {}): Promise<Todo[]> => {
  return [
    {
      id: 1,
      title: "title",
      description: "Description",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      title: "title2",
      description: "Description",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 3,
      title: "title3",
      description: "Description",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];
};

export const postTodo = async (todo: Pick<Todo, "title" | "description">) => {
  return { success: true };
};

export const putTodo = async (
  todoId: Todo["id"],
  data: Pick<Todo, "title" | "description">
) => {
  return { success: true };
};

export const deleteTodo = async (todoId: Todo["id"]) => {
  return { success: true };
};

const todoSchema = z.object({
  id: z.number(),
  title: z.string().max(20),
  description: z.string().max(1024),
  createdAt: z.date().transform((date) => date.toISOString()),
  updatedAt: z.date().transform((date) => date.toISOString()),
  deletedAt: z
    .date()
    .nullable()
    .transform((date) => date?.toISOString() ?? null),
});

export const get = createContract({
  method: "GET",
  path: "/todos/api",
  input: z.object({}),
  output: z.array(todoSchema),
});

export const post = createContract({
  method: "POST",
  path: "/todos/api",
  input: z.object({
    title: z.string().max(20),
    description: z.string().max(1024),
  }),
  output: z.union([
    z.object({ success: z.literal(true) }),
    z.object({ success: z.literal(false), message: z.string().optional() }),
  ]),
});
