"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/data/programmes";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-28 bg-[#0B382A] text-[#FFF7EB] dark-surface overflow-hidden"
    >
      {/* Top curved SVG transition from Cream (#F8F0E3) to Deep Forest Green (#0B382A) */}
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        aria-hidden="true"
        className="absolute top-0 inset-x-0 w-full h-12 sm:h-16 pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,30 C1120,90 680,-10 320,55 C160,82 60,50 0,30 Z"
          fill="#F8F0E3"
        />
      </svg>

      {/* Organic background glow */}
      <div
        className="absolute right-[-10%] bottom-[-15%] w-[520px] h-[520px] rounded-full bg-[#174B38]/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-8">
        <div className="max-w-2xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#FFF7EB] tracking-[-0.03em] leading-[1.1] m-0"
            style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
          >
            Your journey from curious to capable.
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#C9D9B9] leading-relaxed m-0">
            Every NEXTMIND track follows a structured four-stage progression
            designed to turn conceptual curiosity into working projects.
          </p>
        </div>

        {/* Horizontal Timeline on Desktop / Vertical Timeline on Mobile */}
        <div className="mt-14 relative">
          {/* Desktop horizontal connecting track line */}
          <div
            className="hidden lg:block absolute top-11 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#C9D9B9]/30 via-[#C9D9B9] to-[#C9D9B9]/30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Mobile vertical connecting track line */}
          <div
            className="lg:hidden absolute top-6 bottom-6 left-8 w-0.5 bg-gradient-to-b from-[#C9D9B9] via-[#A8C8B1]/60 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-4 gap-8 list-none m-0 p-0">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-20 lg:pl-0 flex flex-col"
              >
                {/* Step Number Badge */}
                <div className="lg:mb-7 absolute left-0 top-0 lg:static flex items-center gap-4">
                  <div
                    className="w-16 h-16 lg:w-22 lg:h-22 rounded-full bg-[#174B38] border-2 border-[#C9D9B9] shadow-[0_0_32px_rgba(201,217,185,0.22)] flex items-center justify-center font-extrabold text-xl lg:text-2xl text-[#FFF7EB]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Step Card */}
                <div className="rounded-2xl bg-[#174B38]/75 border border-[#C9D9B9]/22 p-6 lg:p-7 backdrop-blur-sm flex-1">
                  <h3
                    className="text-xl sm:text-2xl font-extrabold text-[#FFF7EB] tracking-[-0.02em] m-0"
                    style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#C9D9B9] leading-snug m-0">
                    {step.description}
                  </p>
                  <p className="mt-3 text-sm text-[#FFF7EB]/80 leading-relaxed m-0">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

