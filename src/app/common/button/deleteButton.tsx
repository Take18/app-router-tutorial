"use client";

import { MouseEventHandler } from "react";

type Props = {
  text?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DeleteButton = ({ onClick, text = "Delete" }: Props) => {
  return (
    <button onClick={onClick} className="w-20 rounded-md bg-red-500 text-white">
      {text}
    </button>
  );
};
