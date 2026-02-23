import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();

  const backendResponse = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.get("cookie") || "",
    },
    body,
  });

  const data = await backendResponse.text();

  const response = new NextResponse(data, {
    status: backendResponse.status,
  });

  const setCookieHeader = backendResponse.headers.getSetCookie?.();

  if (setCookieHeader) {
    for (const cookie of setCookieHeader) {
      response.headers.append("set-cookie", cookie);
    }
  }

  return response;
}
