"use client";

import { DeleteButton as DButton } from "@/app/common/button/deleteButton";
import { Todo, deleteTodo } from "../contracts";

type Props = {
  todo: Todo;
};

export const DeleteButton = ({ todo }: Props) => {
  const onClick = async () => {
    deleteTodo(todo.id);
  };
  return <DButton onClick={onClick} />;
};
