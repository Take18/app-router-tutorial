"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const Search = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <input
      type="text"
      className="my-4 border border-black"
      placeholder="SEARCH"
      value={searchQuery}
      onInput={(e) => setSearchQuery(e.currentTarget.value)}
    />
  );
};
