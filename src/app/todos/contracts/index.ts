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
