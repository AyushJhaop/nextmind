"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  BookOpen,
  Cpu,
  Award,
  Layers,
  Flame,
  UserCheck,
} from "lucide-react";

export default function PhoneMockups({ onSelectProgramme }) {
  return (
    <div
      className="relative w-full max-w-[490px] mx-auto lg:mx-0 select-none pt-2 pb-4"
      aria-label="NEXTMIND interactive learning platform mobile preview"
    >
      {/* Subtle organic sage-green shape behind the lower-right visual */}
      <svg
        viewBox="0 0 500 420"
        fill="none"
        aria-hidden="true"
        className="absolute -inset-x-6 -bottom-6 w-[112%] h-[112%] -z-10 pointer-events-none"
      >
        <path
          d="M74.5 89.2C136.4 26.8 258.2 14.5 349.6 52.8C441.1 91.1 489.5 186.4 467.8 273.5C446.1 360.6 354.3 406.9 254.2 409.8C154.1 412.7 52.4 372.2 24.8 292.4C-2.8 212.6 12.6 151.6 74.5 89.2Z"
          fill="#C9D9B9"
          fillOpacity="0.58"
        />
        <path
          d="M142.3 54.1C218.7 19.3 331.4 39.8 395.2 102.4C459.1 165.1 464.1 271.2 404.8 334.6C345.5 398 221.8 408.7 136.4 361.2C51 313.7 65.9 88.9 142.3 54.1Z"
          fill="#A8C8B1"
          fillOpacity="0.38"
        />
      </svg>

      <div className="relative flex items-center justify-center sm:justify-end gap-0 min-h-[370px] sm:min-h-[395px]">
        {/* PHONE 1: Left / Front — Course Dashboard, AI Programme Cards, Learning Progress */}
        <motion.div
          initial={{ opacity: 0, y: 22, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: -2, y: -4 }}
          className="relative z-20 w-[225px] sm:w-[242px] rounded-[34px] bg-[#082F24] p-2.5 shadow-[0_28px_60px_-15px_rgba(8,47,36,0.55)] border-[3px] border-[#174B38] -mr-7 sm:-mr-9"
        >
          {/* Speaker notch */}
          <div className="w-16 h-3.5 bg-[#082F24] rounded-b-xl mx-auto mb-1 flex items-center justify-center">
            <span className="w-7 h-1 rounded-full bg-[#174B38]" />
          </div>

          {/* Screen inside */}
          <div className="rounded-[25px] bg-[#FFF7EB] p-3.5 text-[#153D30] overflow-hidden">
            {/* Phone 1 Header: NEXTMIND Branding */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#0B382A] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9D9B9]" aria-hidden="true" />
                </span>
                <span className="font-extrabold text-xs tracking-tight text-[#0B382A]">
                  NEXTMIND
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#C9D9B9]/65 text-[#082F24] text-[10px] font-bold">
                Dashboard
              </span>
            </div>

            {/* Active Course Progress Card */}
            <div className="rounded-2xl bg-[#0B382A] text-[#FFF7EB] p-3 mb-2.5 shadow-sm">
              <div className="flex items-center justify-between text-[10px] text-[#C9D9B9] mb-1">
                <span className="font-semibold">Learning Progress</span>
                <span className="font-bold text-[#FFF7EB]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  78%
                </span>
              </div>
              <p className="text-xs font-bold leading-snug mb-2">
                AI Foundations & Prompt Studio
              </p>
              <div className="w-full h-1.5 rounded-full bg-[#174B38] overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-[#C9D9B9]" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#A8C8B1]">
                <span>Module 04 • Build Lab</span>
                <span>4/5 Projects</span>
              </div>
            </div>

            {/* AI Programme Cards List */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#174B38] m-0">
                Active AI Programmes
              </p>

              <button
                type="button"
                onClick={() => onSelectProgramme && onSelectProgramme("ai-and-automation")}
                className="w-full text-left rounded-xl bg-[#F8F0E3] hover:bg-[#C9D9B9]/40 p-2.5 border border-[#174B38]/12 transition-colors flex items-start gap-2 cursor-pointer"
              >
                <span className="w-7 h-7 rounded-lg bg-[#174B38] text-[#FFF7EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Cpu className="w-3.5 h-3.5 text-[#C9D9B9]" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-[#0B382A] truncate m-0">
                    AI & Automation
                  </p>
                  <p className="text-[10px] text-[#174B38] truncate m-0">
                    Workflow Agents & APIs
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  onSelectProgramme &&
                  onSelectProgramme("digital-product-and-technology")
                }
                className="w-full text-left rounded-xl bg-[#F8F0E3] hover:bg-[#C9D9B9]/40 p-2.5 border border-[#174B38]/12 transition-colors flex items-start gap-2 cursor-pointer"
              >
                <span className="w-7 h-7 rounded-lg bg-[#C9D9B9] text-[#082F24] flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-[#0B382A] truncate m-0">
                    Digital Product & Tech
                  </p>
                  <p className="text-[10px] text-[#174B38] truncate m-0">
                    Web Frameworks & UI/UX
                  </p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* PHONE 2: Right / Overlapping — Student Profile, Course Benefits, Resources, Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 34, rotate: 6 }}
          animate={{ opacity: 1, y: 12, rotate: 6 }}
          transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 3, y: 4 }}
          className="relative z-10 w-[215px] sm:w-[232px] rounded-[34px] bg-[#0B382A] p-2.5 shadow-[0_26px_54px_-12px_rgba(8,47,36,0.48)] border-[3px] border-[#C9D9B9]/45"
        >
          {/* Speaker notch */}
          <div className="w-14 h-3.5 bg-[#082F24] rounded-b-xl mx-auto mb-1 flex items-center justify-center">
            <span className="w-6 h-1 rounded-full bg-[#174B38]" />
          </div>

          <div className="rounded-[25px] bg-[#F8F0E3] p-3.5 text-[#153D30] overflow-hidden">
            {/* Student Profile Header */}
            <div className="flex items-center gap-2.5 pb-2.5 mb-2.5 border-b border-[#174B38]/12">
              <div className="w-8 h-8 rounded-full bg-[#0B382A] text-[#FFF7EB] flex items-center justify-center font-extrabold text-xs shrink-0">
                NM
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold text-[#0B382A] truncate m-0">
                  Student Builder Profile
                </p>
                <p className="text-[10px] text-[#174B38] flex items-center gap-1 m-0">
                  <Flame className="w-3 h-3 text-[#0B382A]" aria-hidden="true" />
                  <span>Hands-on Project Track</span>
                </p>
              </div>
            </div>

            {/* Course Benefits Pills */}
            <div className="mb-2.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#174B38] mb-1.5">
                Course Benefits & Resources
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-[#FFF7EB] p-1.5 border border-[#174B38]/10 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#0B382A] shrink-0" aria-hidden="true" />
                  <span className="text-[9.5px] font-bold text-[#153D30] truncate">
                    Mentorship
                  </span>
                </div>
                <div className="rounded-lg bg-[#FFF7EB] p-1.5 border border-[#174B38]/10 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#0B382A] shrink-0" aria-hidden="true" />
                  <span className="text-[9.5px] font-bold text-[#153D30] truncate">
                    AI Toolkits
                  </span>
                </div>
                <div className="rounded-lg bg-[#FFF7EB] p-1.5 border border-[#174B38]/10 flex items-center gap-1 col-span-2">
                  <Award className="w-3 h-3 text-[#0B382A] shrink-0" aria-hidden="true" />
                  <span className="text-[9.5px] font-bold text-[#153D30] truncate">
                    Verified Project Portfolio
                  </span>
                </div>
              </div>
            </div>

            {/* Project Milestones */}
            <div className="rounded-xl bg-[#0B382A] text-[#FFF7EB] p-2.5">
              <p className="text-[9.5px] font-bold text-[#C9D9B9] uppercase tracking-wider mb-1.5">
                Project Milestones
              </p>
              <ul className="space-y-1.5 list-none m-0 p-0 text-[10px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9D9B9] shrink-0" aria-hidden="true" />
                  <span className="truncate">01. Prompt Workflow Lab</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9D9B9] shrink-0" aria-hidden="true" />
                  <span className="truncate">02. API Automation Build</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#A8C8B1]">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#C9D9B9] flex items-center justify-center text-[8px] shrink-0">
                    3
                  </span>
                  <span className="truncate">03. Portfolio Showcase</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

