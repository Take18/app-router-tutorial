import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(options);

  console.log(session?.user);

  return NextResponse.json({ message: "ok" });
};
