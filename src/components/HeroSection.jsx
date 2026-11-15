"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Workflow,
  MonitorPlay,
  Palette,
  FolderKanban,
  Award,
  UsersRound,
  ArrowRight,
  MessageSquareText,
} from "lucide-react";
import PhoneMockups from "./PhoneMockups";

const FLOATING_ICONS = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    Icon: BrainCircuit,
    positionClass: "top-[10%] left-[6%] sm:left-[8%]",
    delay: 0,
  },
  {
    id: "coding",
    label: "Coding",
    Icon: Code2,
    positionClass: "top-[7%] right-[8%] sm:right-[10%]",
    delay: 0.4,
  },
  {
    id: "automation",
    label: "Automation",
    Icon: Workflow,
    positionClass: "top-[32%] left-[2%] sm:left-[3%]",
    delay: 0.8,
  },
  {
    id: "online-learning",
    label: "Online Learning",
    Icon: MonitorPlay,
    positionClass: "top-[29%] right-[2%] sm:right-[4%]",
    delay: 1.1,
  },
  {
    id: "creativity",
    label: "Digital Creativity",
    Icon: Palette,
    positionClass: "bottom-[28%] left-[3%] sm:left-[5%]",
    delay: 0.6,
  },
  {
    id: "projects",
    label: "Projects",
    Icon: FolderKanban,
    positionClass: "bottom-[26%] right-[4%] sm:right-[6%]",
    delay: 1.4,
  },
  {
    id: "certification",
    label: "Certification",
    Icon: Award,
    positionClass: "bottom-[8%] left-[12%] sm:left-[14%]",
    delay: 0.3,
  },
  {
    id: "collaboration",
    label: "Collaboration",
    Icon: UsersRound,
    positionClass: "bottom-[7%] right-[12%] sm:right-[15%]",
    delay: 0.9,
  },
];

export default function HeroSection({
  onExploreProgrammes,
  onOpenEnquiry,
  onOpenRegister,
}) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-[96vh] w-full overflow-hidden bg-[#FFF7EB] pt-20 lg:pt-0 flex items-stretch"
    >
      {/* DESKTOP & TABLET ASYMMETRICAL ORGANIC FOREST-GREEN LEFT SPLIT (~55% width) */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-[57%] pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 920 1020"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[18px_0_40px_rgba(8,47,36,0.16)]"
        >
          <defs>
            <linearGradient id="heroForestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082F24" />
              <stop offset="52%" stopColor="#0B382A" />
              <stop offset="100%" stopColor="#174B38" />
            </linearGradient>
            <radialGradient id="heroMintGlow" cx="48%" cy="48%" r="48%">
              <stop offset="0%" stopColor="#C9D9B9" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#A8C8B1" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0B382A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft secondary sage-mint organic outer wave */}
          <path
            d="M0,0 L855,0 C925,180 780,365 848,565 C912,750 790,910 705,1020 L0,1020 Z"
            fill="#C9D9B9"
            fillOpacity="0.45"
          />

          {/* Main Deep Forest-Green Organic Shape */}
          <path
            d="M0,0 L825,0 C895,175 745,355 815,555 C882,745 755,905 668,1020 L0,1020 Z"
            fill="url(#heroForestGrad)"
          />

          {/* Inner organic contour highlight */}
          <path
            d="M0,120 C220,90 430,210 560,390 C690,570 610,830 420,980 L0,980 Z"
            fill="#174B38"
            fillOpacity="0.35"
          />

          <circle cx="430" cy="510" r="340" fill="url(#heroMintGlow)" />
        </svg>
      </div>

      {/* Main Hero Grid Container */}
      <div className="relative z-10 max-w-[1380px] mx-auto w-full px-5 sm:px-8 lg:px-12 pt-4 pb-14 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* LEFT SIDE (~55% width on desktop): Forest-green organic canvas + 3D Student + Glowing Ring + 8 Floating Glass Educational Icons */}
        <div className="w-full lg:w-[54%] relative rounded-[36px] lg:rounded-none bg-gradient-to-br from-[#082F24] via-[#0B382A] to-[#174B38] lg:bg-none p-6 sm:p-10 lg:p-4 shadow-[0_28px_60px_-18px_rgba(8,47,36,0.45)] lg:shadow-none overflow-hidden lg:overflow-visible">
          {/* Ambient radial glow behind the 3D student character */}
          <div
            className="relative mx-auto w-full max-w-[540px] aspect-square flex items-center justify-center"
          >
            {/* Outer glowing circular rings */}
            <div
              className="absolute w-[82%] h-[82%] rounded-full border-2 border-[#C9D9B9]/40 shadow-[0_0_70px_12px_rgba(201,217,185,0.22),inset_0_0_50px_rgba(201,217,185,0.16)] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-[#A8C8B1]/30 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute w-[70%] h-[70%] rounded-full bg-radial from-[#C9D9B9]/25 via-[#174B38]/20 to-transparent blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Central 3D Student Illustration inside the Glowing Circular Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-[76%] h-[76%] rounded-full overflow-hidden border-[3px] border-[#FFF7EB]/65 shadow-[0_0_55px_rgba(255,247,235,0.32)] bg-[#0B382A]"
            >
              <img
                src="/images/hero-student-3d.png"
                alt="Friendly 3D illustrated college student holding a laptop and book inside a glowing ring"
                className="w-full h-full object-cover object-center scale-[1.05]"
                fetchPriority="high"
              />
            </motion.div>

            {/* 8 Floating Translucent Glass Educational & AI Icons */}
            {FLOATING_ICONS.map(({ id, label, Icon, positionClass, delay }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: [0, -7, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: delay * 0.25 },
                  y: {
                    duration: 3.8 + (delay % 1.5),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  },
                }}
                className={`nm-glass-bubble absolute z-20 ${positionClass} rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2 text-[#FFF7EB]`}
              >
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FFF7EB]/18 border border-[#FFF7EB]/30 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-4 h-4 text-[#FFF7EB]"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap pr-0.5">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Core Brand Message Pill at base of Hero Illustration */}
          <div className="relative z-20 mt-3 mx-auto max-w-md rounded-full bg-[#082F24]/85 border border-[#C9D9B9]/30 px-5 py-2.5 text-center backdrop-blur-md">
            <p className="text-xs sm:text-sm font-semibold text-[#FFF7EB] m-0">
              “Don&apos;t just learn about AI.{" "}
              <span className="text-[#C9D9B9] font-extrabold">
                Learn to build with it.
              </span>
              ”
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (~45% width on desktop): Warm Ivory Background, Typography, CTAs & Overlapping Smartphone Mockups */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between lg:pl-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            {/* Large Hero Headline */}
            <h1
              className="text-5xl sm:text-6xl xl:text-[4.25rem] font-extrabold text-[#0B382A] tracking-[-0.035em] leading-[1.04] m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              AI Education
            </h1>

            {/* Supporting Headline */}
            <p
              className="mt-3 text-2xl sm:text-3xl font-bold text-[#174B38] tracking-[-0.02em] leading-[1.2] m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Build skills. Create possibilities.
            </p>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-[#153D30]/90 leading-relaxed max-w-[54ch] m-0">
              Learn practical AI, automation and digital skills through hands-on
              projects, expert guidance and industry-relevant programmes.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreProgrammes}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-base shadow-[0_16px_32px_-10px_rgba(11,56,42,0.45)] hover:shadow-[0_20px_36px_-8px_rgba(11,56,42,0.55)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/45 text-[#0B382A] border border-[#174B38]/22 font-bold text-base transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <MessageSquareText className="w-4 h-4 text-[#174B38]" aria-hidden="true" />
                <span>Talk to an Advisor</span>
              </button>
            </div>
          </motion.div>

          {/* Lower-Right Portion of Hero: Two Overlapping Smartphone Mockups */}
          <div className="mt-8 lg:mt-6">
            <PhoneMockups
              onSelectProgramme={(slug) => onOpenRegister(slug)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

