import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const programmes = await prisma.programme.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });
    return NextResponse.json({ programmes });
  } catch (error) {
    console.error("Error fetching programmes:", error);
    return NextResponse.json(
      { error: "Unable to load programmes at this time." },
      { status: 500 }
    );
  }
}

