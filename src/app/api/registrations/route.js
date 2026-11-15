import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations";
import { getAdminSession } from "@/lib/auth";

function generateReferenceCode() {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `NM-2026-${suffix}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const issues = parsed.error.issues || parsed.error.errors || [];
      return NextResponse.json(
        {
          error: issues[0]?.message || "Please check your registration details.",
          fieldErrors: issues.reduce((acc, curr) => {
            const key = curr.path?.[0] || "_form";
            acc[key] = curr.message;
            return acc;
          }, {}),
        },
        { status: 400 }
      );
    }

    const { fullName, email, phone, programmeSlug, educationLevel, occupation } =
      parsed.data;

    // Resolve Programme by slug or id or title
    let programme = await prisma.programme.findUnique({
      where: { slug: programmeSlug },
    });
    if (!programme) {
      programme = await prisma.programme.findUnique({
        where: { id: programmeSlug },
      });
    }
    if (!programme) {
      programme = await prisma.programme.findFirst({
        where: { title: programmeSlug },
      });
    }

    if (!programme || !programme.isActive) {
      return NextResponse.json(
        { error: "The selected programme could not be found or is inactive." },
        { status: 404 }
      );
    }

    // Upsert user by normalized email
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.upsert({
      where: { email: normalizedEmail },
      update: {
        fullName: fullName.trim(),
        phone: phone.trim(),
      },
      create: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
      },
    });

    // Check duplicate registration for the same user + programme
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId: user.id,
        programmeId: programme.id,
      },
      include: {
        user: true,
        programme: true,
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        {
          error: `You are already registered for ${programme.title} with this email address.`,
          isDuplicate: true,
          registration: existingRegistration,
        },
        { status: 409 }
      );
    }

    // Generate unique registrationReference
    let registrationReference = generateReferenceCode();
    for (let attempt = 0; attempt < 5; attempt++) {
      const exists = await prisma.registration.findUnique({
        where: { registrationReference },
      });
      if (!exists) break;
      registrationReference = generateReferenceCode();
    }

    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        programmeId: programme.id,
        educationLevel: educationLevel.trim(),
        occupation: occupation ? occupation.trim() : null,
        status: "CONFIRMED",
        registrationReference,
      },
      include: {
        user: true,
        programme: true,
      },
    });

    return NextResponse.json(
      {
        message: "Programme registration confirmed.",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred while processing your registration.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const registrations = await prisma.registration.findMany({
      include: {
        user: true,
        programme: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Fetch registrations error:", error);
    return NextResponse.json(
      { error: "Failed to load registrations." },
      { status: 500 }
    );
  }
}

