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

export const putTodo = async (
  todoId: Todo["id"],
  data: Pick<Todo, "title" | "description">
) => {
  return { success: true };
};

export const deleteTodo = async (todoId: Todo["id"]) => {
  return { success: true };
};

export const get = createContract({
  method: "GET",
  path: "/todos/api?q=[q]",
  input: z.object({}),
  inputInverse: z.object({}),
  output: z.array(
    z.object({
      id: z.number(),
      title: z.string().max(20),
      description: z.string().max(1024),
      createdAt: z.date().transform((date) => date.toISOString()),
      updatedAt: z.date().transform((date) => date.toISOString()),
      deletedAt: z
        .date()
        .nullable()
        .transform((date) => date?.toISOString() ?? null),
    })
  ),
  outputInverse: z.array(
    z.object({
      id: z.number(),
      title: z.string().max(20),
      description: z.string().max(1024),
      createdAt: z.string().transform((date) => new Date(date)),
      updatedAt: z.string().transform((date) => new Date(date)),
      deletedAt: z
        .string()
        .nullable()
        .transform((date) => (date == null ? null : new Date(date))),
    })
  ),
});

export const post = createContract({
  method: "POST",
  path: "/todos/api",
  input: z.object({
    title: z.string().max(20),
    description: z.string().max(1024),
  }),
  inputInverse: z.object({
    title: z.string().max(20),
    description: z.string().max(1024),
  }),
  output: z.union([
    z.object({ success: z.literal(true) }),
    z.object({ success: z.literal(false), message: z.string().optional() }),
  ]),
  outputInverse: z.union([
    z.object({ success: z.literal(true) }),
    z.object({ success: z.literal(false), message: z.string().optional() }),
  ]),
});
