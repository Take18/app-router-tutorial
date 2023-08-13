"use client";

import { DeleteButton as DButton } from "@/app/common/button/deleteButton";
import { Todo, deleteTodo } from "../contracts";
import { useRouter } from "next/navigation";

type Props = {
  todo: Todo;
};

export const DeleteButton = ({ todo }: Props) => {
  const router = useRouter();
  const onClick = async () => {
    deleteTodo(todo.id);
    router.refresh();
  };
  return <DButton onClick={onClick} />;
};
