"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  BarChart3,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { PROGRAMMES_DATA } from "@/data/programmes";

export default function ProgrammesSection({
  onEnrolProgramme,
  onViewProgramme,
  liveCounts = {},
}) {
  return (
    <section
      id="programmes"
      className="relative py-20 lg:py-28 bg-[#F8F0E3] overflow-hidden"
    >
      {/* Top organic wave transition from warm ivory (#FFF7EB) into cream (#F8F0E3) */}
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        aria-hidden="true"
        className="absolute top-0 inset-x-0 w-full h-12 sm:h-16 pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,42 C1140,95 820,5 480,58 C240,95 90,45 0,25 Z"
          fill="#FFF7EB"
        />
      </svg>

      {/* Subtle sage organic background shape */}
      <div
        className="absolute -left-24 top-1/3 w-96 h-96 rounded-full bg-[#C9D9B9]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0B382A] tracking-[-0.03em] leading-[1.1] m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Find your next skill.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-[#153D30]/90 leading-relaxed m-0">
              Choose a learning path that matches your interests and ambitions.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FFF7EB] px-4 py-3 border border-[#174B38]/12 text-xs sm:text-sm text-[#153D30]">
            <span className="font-bold text-[#0B382A]">Note:</span> Cohort
            schedules and durations are editable placeholders tailored per intake.
          </div>
        </div>

        {/* Three Large Programme Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROGRAMMES_DATA.map((prog, index) => {
            const count = liveCounts[prog.slug];
            return (
              <motion.article
                key={prog.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className="rounded-2xl bg-[#FFF7EB] shadow-[0_22px_48px_-18px_rgba(11,56,42,0.16)] overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* 3D Programme Illustration Header */}
                  <div className="relative h-56 w-full bg-[#0B382A] overflow-hidden">
                    <img
                      src={prog.image}
                      alt={`${prog.title} 3D illustration`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082F24]/80 via-transparent to-transparent" />

                    {/* Level Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF7EB]/95 text-[#0B382A] text-xs font-extrabold shadow-sm">
                        <BarChart3 className="w-3.5 h-3.5 text-[#174B38]" aria-hidden="true" />
                        <span>{prog.level}</span>
                      </span>
                    </div>

                    {typeof count === "number" && count > 0 && (
                      <div className="absolute bottom-3 right-4">
                        <span
                          className="px-3 py-1 rounded-full bg-[#082F24]/85 border border-[#C9D9B9]/35 text-[#C9D9B9] text-[11px] font-bold"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {count} Registered Learners
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-7">
                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[#C9D9B9]/45 text-[#082F24] text-xs font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      className="text-2xl font-extrabold text-[#0B382A] tracking-[-0.025em] m-0"
                      style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                    >
                      {prog.title}
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-base text-[#153D30]/90 leading-relaxed m-0">
                      {prog.description}
                    </p>

                    {/* Editable Duration Placeholder */}
                    <div className="mt-4 rounded-xl bg-[#F8F0E3] px-3.5 py-2.5 flex items-center gap-2 text-xs font-semibold text-[#174B38]">
                      <Clock className="w-4 h-4 text-[#0B382A] shrink-0" aria-hidden="true" />
                      <span>{prog.duration}</span>
                    </div>

                    {/* Programme Topics List */}
                    <div className="mt-5 pt-5 border-t border-[#174B38]/12">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#174B38] mb-3 m-0">
                        Core Topics Covered
                      </p>
                      <ul className="space-y-2 list-none m-0 p-0" role="list">
                        {prog.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-center gap-2.5 text-sm font-medium text-[#153D30]"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-[#174B38] shrink-0"
                              aria-hidden="true"
                            />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Actions: View Programme & Enrol Now */}
                <div className="px-7 pb-7 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onViewProgramme(prog)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/50 text-[#0B382A] border border-[#174B38]/20 font-bold text-sm transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#174B38]" aria-hidden="true" />
                    <span>View Programme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnrolProgramme(prog.slug)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm shadow-[0_12px_24px_-8px_rgba(11,56,42,0.4)] transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <span>Enrol Now</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

