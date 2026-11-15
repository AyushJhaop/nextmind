import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import {
  enquiryStatusUpdateSchema,
  registrationStatusUpdateSchema,
} from "@/lib/validations";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to the NEXTMIND Admin Portal." },
      { status: 401 }
    );
  }

  try {
    const [programmes, registrations, enquiries] = await Promise.all([
      prisma.programme.findMany({
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      }),
      prisma.registration.findMany({
        include: {
          user: true,
          programme: true,
        },
      }),
      prisma.enquiry.findMany(),
    ]);

    const programmeStats = programmes.map((prog) => ({
      id: prog.id,
      title: prog.title,
      slug: prog.slug,
      level: prog.level,
      registrationsCount: prog._count?.registrations || 0,
      enquiriesCount: enquiries.filter(
        (e) =>
          e.programmeInterest.toLowerCase() === prog.title.toLowerCase() ||
          e.programmeInterest.toLowerCase() === prog.slug.toLowerCase()
      ).length,
    }));

    return NextResponse.json({
      summary: {
        totalRegistrations: registrations.length,
        totalEnquiries: enquiries.length,
        newEnquiries: enquiries.filter((e) => e.status === "NEW").length,
        confirmedRegistrations: registrations.filter(
          (r) => r.status === "CONFIRMED" || r.status === "ENROLLED"
        ).length,
      },
      programmeStats,
      registrations,
      enquiries,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return NextResponse.json(
      { error: "Failed to load admin overview." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (body?.type === "enquiry") {
      const parsed = enquiryStatusUpdateSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid enquiry status payload." },
          { status: 400 }
        );
      }
      const updated = await prisma.enquiry.update({
        where: { id: parsed.data.id },
        data: { status: parsed.data.status },
      });
      return NextResponse.json({ enquiry: updated });
    }

    if (body?.type === "registration") {
      const parsed = registrationStatusUpdateSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid registration status payload." },
          { status: 400 }
        );
      }
      const updated = await prisma.registration.update({
        where: { id: parsed.data.id },
        data: { status: parsed.data.status },
        include: { user: true, programme: true },
      });
      return NextResponse.json({ registration: updated });
    }

    return NextResponse.json(
      { error: "Unsupported update type." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update record." },
      { status: 500 }
    );
  }
}

