import { NextResponse } from "next/server";
import { z } from "zod";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
type PathParams<T> = T extends `${infer _Start}[${infer Param}]${infer Rest}`
  ? { [K in Param]: string } & PathParams<Rest>
  : {};

export const createContract = <
  M extends Method,
  P extends string,
  T extends z.ZodTypeAny,
  I extends z.ZodTypeAny,
  K extends z.ZodTypeAny,
  O extends z.ZodTypeAny
>({
  method,
  path,
  input,
  inputInverse,
  output,
  outputInverse,
}: {
  method: M;
  path: P;
  input: T;
  inputInverse: I;
  output: K;
  outputInverse: O;
}) => {
  const handler = (
    impl: (ctx: {
      input: z.output<I>;
      request: Request;
      params: PathParams<P>;
    }) => Promise<z.input<K>>
  ): ((
    request: Request,
    ctx: { params: Partial<PathParams<P>> }
  ) => Promise<NextResponse>) => {
    return async (request, ctx) => {
      if (!["GET", "DELETE"].includes(method)) {
        const body = await request.json();
        const parsedInput = inputInverse.safeParse(body);
        if (!parsedInput.success)
          return NextResponse.json(
            { message: parsedInput.error.message },
            { status: 400 }
          );

        const params = { ...ctx.params } as PathParams<P>;

        const data = await impl({
          params,
          input: parsedInput.data,
          request,
        }).catch((e) => {
          if (e instanceof NextResponse) return e;
          return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        });

        if (data instanceof NextResponse) return data;

        const parsedOutput = output.safeParse(data);
        if (parsedOutput.success) return NextResponse.json(parsedOutput.data);
        return NextResponse.json(
          { message: parsedOutput.error.message },
          { status: 500 }
        );
      }

      const { searchParams } = new URL(request.url);
      const queryParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
      const params = { ...ctx.params, ...queryParams } as PathParams<P>;

      const data = await impl({ params, input: {}, request }).catch((e) => {
        if (e instanceof NextResponse) return e;
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      });

      if (data instanceof NextResponse) return data;

      const parsedOutput = output.safeParse(data);
      if (parsedOutput.success) return NextResponse.json(parsedOutput.data);
      return NextResponse.json(
        { message: parsedOutput.error.message },
        { status: 500 }
      );
    };
  };

  const createUrl = (path: P, params: Record<string, string>): string => {
    const pathnameAndQuery = path.replace(
      /\[([^\]]+)\]/g,
      (_, key) => params[key]
    );
    const fullpath = `${
      typeof window === "undefined" ? "http://localhost:3000" : ""
    }${pathnameAndQuery}`;
    return fullpath;
  };

  const client = (
    { input: input_, params }: { input: z.input<T>; params: PathParams<P> },
    init?: RequestInit
  ): Promise<z.output<O>> => {
    const parsed = input.safeParse(input_);
    if (!parsed.success)
      throw new Error(`Invalid Input: ${parsed.error.message}`);

    return fetch(createUrl(path, params), {
      headers: { "Content-Type": "application/json" },
      ...init,
      method,
      ...(["GET", "DELETE"].includes(method)
        ? {}
        : { body: JSON.stringify(parsed.data) }),
    })
      .then((res) => res.json())
      .then((res) => {
        const parsed = outputInverse.safeParse(res);
        if (parsed.success) return parsed.data;
        throw new Error(`Invalid Server Response: ${parsed.error.message}`);
      });
  };

  return {
    fetch: client,
    handler,
  };
};
