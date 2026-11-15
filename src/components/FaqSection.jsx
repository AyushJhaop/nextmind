"use client";

import React from "react";
import { FAQ_ITEMS } from "@/data/programmes";

export default function FaqSection({ onOpenEnquiry }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-20 lg:py-28 bg-[#F8F0E3] overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#0B382A] tracking-[-0.03em] leading-[1.1] m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-[#153D30]/90 leading-relaxed m-0">
              Everything you need to know about joining NEXTMIND programmes,
              mentorship, and hands-on project building.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry()}
            className="self-start md:self-auto px-5 py-3 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm transition-colors cursor-pointer"
          >
            Ask an Advisor Directly
          </button>
        </div>

        {/* Native HTML <details> Accordion (modern-web-guidance accordion) */}
        <div className="nm-accordion space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => (
            <details key={item.question} open={idx === 0}>
              <summary>{item.question}</summary>
              <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#153D30]/90 leading-relaxed pl-12">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

