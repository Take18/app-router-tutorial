"use client";

import Link from "next/link";
import { Todo } from "../_contracts";

type Props = {
  todo: Todo;
};

export const EditButton = ({ todo }: Props) => {
  return (
    <Link
      href={`/todos/${todo.id}`}
      className="w-20 rounded-md bg-green-200 text-center text-black"
    >
      Edit
    </Link>
  );
};
