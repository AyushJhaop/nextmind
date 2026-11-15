import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { enquirySchema, enquiryStatusUpdateSchema } from "@/lib/validations";
import { getAdminSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      const issues = parsed.error.issues || parsed.error.errors || [];
      return NextResponse.json(
        {
          error: issues[0]?.message || "Please check your enquiry details.",
          fieldErrors: issues.reduce((acc, curr) => {
            const key = curr.path?.[0] || "_form";
            acc[key] = curr.message;
            return acc;
          }, {}),
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      programmeInterest,
      educationLevel,
      preferredContactMethod,
      message,
    } = parsed.data;

    const normalizedEmail = email.toLowerCase().trim();

    // Prevent accidental rapid duplicate submission (within 2 minutes)
    const recentEnquiry = await prisma.enquiry.findFirst({
      where: {
        email: normalizedEmail,
        programmeInterest: programmeInterest.trim(),
      },
    });

    if (recentEnquiry) {
      const elapsedMs =
        Date.now() - new Date(recentEnquiry.createdAt).getTime();
      if (elapsedMs < 1000 * 120) {
        return NextResponse.json(
          {
            error:
              "We already received your enquiry for this programme moments ago. An advisor will be in touch shortly.",
            isDuplicate: true,
            enquiry: recentEnquiry,
          },
          { status: 409 }
        );
      }
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        programmeInterest: programmeInterest.trim(),
        educationLevel: educationLevel.trim(),
        preferredContactMethod: preferredContactMethod.trim(),
        message: message ? message.trim() : null,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        message:
          "Your enquiry has been received. A NEXTMIND advisor will contact you soon.",
        enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry POST error:", error);
    return NextResponse.json(
      {
        error: "An unexpected server error occurred while submitting your enquiry.",
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
    const enquiries = await prisma.enquiry.findMany();
    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error("Enquiry GET error:", error);
    return NextResponse.json(
      { error: "Failed to load enquiries." },
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
    const parsed = enquiryStatusUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid enquiry status update payload." },
        { status: 400 }
      );
    }

    const updated = await prisma.enquiry.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({
      message: "Enquiry status updated.",
      enquiry: updated,
    });
  } catch (error) {
    console.error("Enquiry PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry status." },
      { status: 500 }
    );
  }
}

