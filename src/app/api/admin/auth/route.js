import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  createAdminToken,
  getAdminSession,
  getExpectedAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    admin: { email: session.email, role: session.role },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toLowerCase().trim();
    const accessCode = (body?.accessCode || "").trim();

    const expected = getExpectedAdminCredentials();

    if (email !== expected.email || accessCode !== expected.accessCode) {
      return NextResponse.json(
        {
          error:
            "Invalid administrator email or access code. Please verify your credentials.",
        },
        { status: 401 }
      );
    }

    const token = createAdminToken(email);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return NextResponse.json({
      authenticated: true,
      admin: { email, role: "ADMIN" },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication service error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ authenticated: false });
}

