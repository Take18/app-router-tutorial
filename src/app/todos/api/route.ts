import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { NextResponse } from "next/server";
import { post } from "../_contracts";
import { prisma } from "@/app/server/db";

export const GET = async () => {
  const session = await getServerSession(options);

  console.log(session?.user);

  return NextResponse.json({ message: "ok" });
};

export const POST = post.handler(async ({ input: { title, description } }) => {
  const createResult = prisma.todo
    .create({
      data: {
        title,
        description,
      },
    })
    .then(() => ({ success: true }))
    .catch((e) => {
      if (e instanceof Error) return { success: false, message: e.message };
      return { success: false };
    });

  return createResult;
});
