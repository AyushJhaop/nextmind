"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, UserRound } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/data/programmes";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? SAMPLE_TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === SAMPLE_TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const current = SAMPLE_TESTIMONIALS[activeIndex];

  return (
    <section className="relative py-20 lg:py-28 bg-[#FFF7EB] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0B382A] tracking-[-0.03em] leading-[1.1] m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Learning experiences that matter.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-[#153D30]/90 leading-relaxed m-0">
              Sample learner reflections layout — clearly marked as editable
              placeholder cards until verified student testimonials are added.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous sample testimonial"
              className="w-12 h-12 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/60 text-[#0B382A] border border-[#174B38]/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next sample testimonial"
              className="w-12 h-12 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Featured Carousel Card + Side Overview Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-2xl bg-[#0B382A] text-[#FFF7EB] p-8 sm:p-10 shadow-[0_24px_54px_-18px_rgba(11,56,42,0.38)] flex flex-col justify-between relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174B38] border border-[#C9D9B9]/35 text-[#C9D9B9] text-xs font-bold">
                      Sample Testimonial Placeholder
                    </span>
                    <Quote
                      className="w-8 h-8 text-[#C9D9B9]/40"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="text-lg sm:text-xl font-medium text-[#FFF7EB] leading-relaxed m-0">
                    “{current.quote}”
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-[#FFF7EB]/15 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Student Photo Placeholder */}
                    <div
                      className="w-13 h-13 rounded-full bg-[#C9D9B9] text-[#082F24] flex items-center justify-center font-extrabold text-sm shrink-0"
                      aria-label="Student photo placeholder"
                    >
                      <UserRound className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-extrabold text-base text-[#FFF7EB] m-0">
                        {current.name}
                      </p>
                      <p className="text-xs sm:text-sm text-[#C9D9B9] m-0">
                        {current.role} •{" "}
                        <span className="font-bold text-[#FFF7EB]">
                          {current.programme}
                        </span>
                      </p>
                    </div>
                  </div>

                  <span
                    className="text-xs font-bold text-[#C9D9B9]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    0{activeIndex + 1} / 0{SAMPLE_TESTIMONIALS.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* All 3 Cards Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {SAMPLE_TESTIMONIALS.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left rounded-2xl p-5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#C9D9B9]/55 border-2 border-[#0B382A]"
                      : "bg-[#F8F0E3] hover:bg-[#C9D9B9]/30 border border-[#174B38]/12"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#174B38]">
                      {item.programme}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FFF7EB] text-[#0B382A] text-[10px] font-bold">
                      Sample Card
                    </span>
                  </div>
                  <p className="font-extrabold text-sm text-[#0B382A] m-0">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-[#153D30]/85 line-clamp-2 m-0">
                    {item.quote}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

