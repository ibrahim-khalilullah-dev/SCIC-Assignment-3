import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SERVER_URL = process.env.BACKEND_INTERNAL_URL || "http://localhost:5000";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  return handleProxy(request, await context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  return handleProxy(request, await context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  return handleProxy(request, await context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  return handleProxy(request, await context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  return handleProxy(request, await context.params);
}

async function handleProxy(request: NextRequest, params: { all: string[] }) {
  try {
    const path = params.all.join("/");
    const searchParams = request.nextUrl.searchParams.toString();
    const destUrl = `${SERVER_URL}/api/${path}${searchParams ? "?" + searchParams : ""}`;

    const cookieStore = await cookies();
    const token =
      cookieStore.get("better-auth.session_token")?.value ||
      cookieStore.get("__Secure-better-auth.session_token")?.value;

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (
        key.toLowerCase() !== "host" &&
        key.toLowerCase() !== "cookie" &&
        key.toLowerCase() !== "connection"
      ) {
        headers.set(key, value);
      }
    });

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    let body: any = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await request.arrayBuffer();
    }

    const res = await fetch(destUrl, {
      method: request.method,
      headers,
      body,
    });

    const resHeaders = new Headers();
    res.headers.forEach((value, key) => {
      resHeaders.set(key, value);
    });

    return new NextResponse(await res.arrayBuffer(), {
      status: res.status,
      statusText: res.statusText,
      headers: resHeaders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Proxy error" },
      { status: 500 },
    );
  }
}
