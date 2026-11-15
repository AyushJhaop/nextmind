"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { RegistrationWizard } from "@/components/ConversionModals";

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const initialProgramme = searchParams.get("programme") || "ai-foundations";

  return (
    <div className="min-h-screen bg-[#FFF7EB] text-[#153D30] py-10 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1180px] mx-auto">
        <header className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-decoration-none"
          >
            <span className="w-10 h-10 rounded-xl bg-[#0B382A] text-[#FFF7EB] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C9D9B9]" aria-hidden="true" />
            </span>
            <span
              className="font-extrabold text-2xl tracking-[-0.03em] text-[#0B382A]"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              NEXT<span className="text-[#174B38]">MIND</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/45 text-[#0B382A] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Website</span>
          </Link>
        </header>

        <main
          id="main-content"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5 rounded-3xl bg-[#0B382A] text-[#FFF7EB] p-8 sm:p-10 shadow-xl">
            <span className="px-3.5 py-1.5 rounded-full bg-[#174B38] text-[#C9D9B9] text-xs font-extrabold uppercase tracking-wider">
              Official Programme Admissions
            </span>
            <h1
              className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-tight m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Don&apos;t just learn about AI. Learn to build with it.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#C9D9B9] leading-relaxed m-0">
              Complete the 3-step registration form to reserve your place in a
              NEXTMIND practical learning track and receive your instant
              registration reference code.
            </p>

            <ul className="mt-8 space-y-3.5 list-none m-0 p-0 text-sm">
              {[
                "Hands-on project build labs & portfolio artefacts",
                "Structured mentorship & feedback throughout your track",
                "Industry-relevant AI, automation & web tooling",
                "Instant registration reference code upon confirmation",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-5 h-5 text-[#C9D9B9] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <RegistrationWizard initialProgrammeSlug={initialProgramme} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF7EB] p-12 text-center font-bold text-[#0B382A]">
          Loading Registration Portal...
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}

