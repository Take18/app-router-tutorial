import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { NextResponse } from "next/server";
import { get, post } from "../_contracts";
import { prisma } from "@/app/server/db";

export const GET = get.handler(async ({ params: { q } }) => {
  const getResult = prisma.todo
    .findMany({
      where: {
        deletedAt: null,
        ...(q === ""
          ? {}
          : {
              OR: [
                { title: { contains: q } },
                { description: { contains: q } },
              ],
            }),
      },
    })
    .catch((e: unknown) => {
      if (e instanceof Error) console.error(e.message);
      return [];
    });
  return getResult;
});

export const POST = post.handler(async ({ input: { title, description } }) => {
  const session = await getServerSession(options);
  if (!session?.user) {
    throw NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const createResult = prisma.todo
    .create({
      data: {
        title,
        description,
      },
    })
    .then(() => ({ success: true }))
    .catch((e: unknown) => {
      if (e instanceof Error) return { success: false, message: e.message };
      return { success: false };
    });

  return createResult;
});
