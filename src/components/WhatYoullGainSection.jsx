"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Terminal,
  Layers,
  Puzzle,
  ShieldCheck,
  Briefcase,
  MessageSquareHeart,
  Compass,
} from "lucide-react";
import { WHAT_YOULL_GAIN_ITEMS } from "@/data/programmes";

const GAIN_ICONS = {
  Sparkles,
  Terminal,
  Layers,
  Puzzle,
  ShieldCheck,
  Briefcase,
  MessageSquareHeart,
  Compass,
};

export default function WhatYoullGainSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#FFF7EB] overflow-hidden">
      {/* Top curved SVG transition from Forest Green (#0B382A) to Warm Ivory (#FFF7EB) */}
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        aria-hidden="true"
        className="absolute top-0 inset-x-0 w-full h-12 sm:h-16 pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1440,0 L1440,25 C1060,85 520,0 0,65 Z"
          fill="#0B382A"
        />
      </svg>

      {/* Organic sage-green decorative background blob */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        className="absolute -right-36 top-16 w-[480px] h-[480px] opacity-40 pointer-events-none"
      >
        <path
          d="M148.2 76.4C241.5 18.2 384.1 24.8 468.4 98.2C552.7 171.6 578.7 311.8 518.4 416.5C458.1 521.2 311.5 590.4 192.4 556.8C73.3 523.2 -18.3 386.8 6.8 264.2C31.9 141.6 54.9 134.6 148.2 76.4Z"
          fill="#C9D9B9"
        />
      </svg>

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-8">
        <div className="max-w-2xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0B382A] tracking-[-0.03em] leading-[1.1] m-0"
            style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
          >
            More than just another certificate.
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#153D30]/90 leading-relaxed m-0">
            Graduate with demonstrable capabilities, working digital artefacts,
            and the confidence to build with modern AI tools.
          </p>
        </div>

        {/* Mixture of Illustrated Cards, Icon Bubbles & Organic Green Shapes */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_YOULL_GAIN_ITEMS.map((item, idx) => {
            const Icon = GAIN_ICONS[item.icon] || Sparkles;
            const isHighlighted = idx === 0 || idx === 5;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                  isHighlighted
                    ? "bg-[#0B382A] text-[#FFF7EB] shadow-[0_20px_42px_-15px_rgba(11,56,42,0.4)]"
                    : "bg-[#F8F0E3] text-[#153D30] shadow-[0_16px_36px_-18px_rgba(11,56,42,0.14)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isHighlighted
                          ? "bg-[#FFF7EB]/14 text-[#C9D9B9] border border-[#FFF7EB]/25"
                          : "bg-[#C9D9B9]/65 text-[#0B382A]"
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isHighlighted ? "bg-[#C9D9B9]" : "bg-[#174B38]/40"
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-extrabold tracking-[-0.02em] m-0 ${
                      isHighlighted ? "text-[#FFF7EB]" : "text-[#0B382A]"
                    }`}
                    style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2.5 text-sm leading-relaxed m-0 ${
                      isHighlighted
                        ? "text-[#FFF7EB]/85"
                        : "text-[#153D30]/85"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t text-xs font-bold flex items-center justify-between ${
                    isHighlighted
                      ? "border-[#FFF7EB]/15 text-[#C9D9B9]"
                      : "border-[#174B38]/10 text-[#174B38]"
                  }`}
                >
                  <span>NEXTMIND Outcome</span>
                  <span>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

