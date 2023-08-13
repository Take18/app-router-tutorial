export type Todo = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export const getTodos = async (): Promise<Todo[]> => {
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

export const postTodo = async (todo: Todo) => {
  return { success: true };
};

export const putTodo = async (todoId: number, data: Omit<Todo, "id">) => {
  return { success: true };
};

export const deleteTodo = async (todoId: number) => {
  return { success: true };
};
