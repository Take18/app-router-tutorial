"use client";

import { useForm } from "react-hook-form";
import { post } from "../_contracts";
import { useRouter } from "next/navigation";

export const AddTodoForm = () => {
  type AddTodo = Parameters<typeof post.fetch>[0]["input"];

  const { register, handleSubmit, reset } = useForm<AddTodo>();
  const router = useRouter();

  const submitForm = async (data: AddTodo) => {
    post.fetch({ input: data, params: {} });
    reset();

    router.refresh();
  };

  return (
    <>
      <form
        className="mt-16 flex w-4/5 flex-col gap-4"
        onSubmit={handleSubmit(submitForm)}
      >
        <h2 className="mx-auto text-2xl">Create Todo</h2>
        <input
          className="w-full border border-black"
          placeholder="Input Title"
          {...register("title")}
        />
        <textarea
          className="w-full border border-black"
          placeholder="Input Description"
          {...register("description")}
        ></textarea>
        <button
          className="mx-auto w-20 rounded-md bg-blue-500 text-white"
          type="submit"
        >
          作成
        </button>
      </form>
    </>
  );
};
