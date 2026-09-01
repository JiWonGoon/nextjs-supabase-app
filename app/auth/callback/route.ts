import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    const errorDescription = searchParams.get("error_description");
    return NextResponse.redirect(
      new URL(`/auth/error?error=${error}&error_description=${errorDescription}`, request.url)
    );
  }

  if (code) {
    return NextResponse.redirect(new URL(`/api/auth/callback?code=${code}`, request.url));
  }

  return NextResponse.redirect(new URL("/auth/error", request.url));
}
