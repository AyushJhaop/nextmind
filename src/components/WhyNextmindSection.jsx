"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, Cpu, Users, FolderGit2 } from "lucide-react";
import { WHY_NEXTMIND_FEATURES } from "@/data/programmes";

const ICON_MAP = {
  Hammer,
  Cpu,
  Users,
  FolderGit2,
};

export default function WhyNextmindSection() {
  return (
    <section
      id="about-us"
      className="relative py-20 lg:py-28 bg-[#FFF7EB] overflow-hidden"
    >
      {/* Decorative soft sage organic curve */}
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        aria-hidden="true"
        className="w-full h-14 sm:h-20 -mt-20 mb-8 pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,48 C360,120 720,-20 1080,56 C1260,92 1380,40 1440,24 L1440,120 L0,120 Z"
          fill="#FFF7EB"
        />
      </svg>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#0B382A] tracking-[-0.03em] leading-[1.12] m-0"
            style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
          >
            Learning that goes beyond the classroom.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#153D30]/90 leading-relaxed m-0">
            Technology is changing how the world works. NEXTMIND helps you
            develop the practical skills to participate in that change.
          </p>
        </div>

        {/* Four Feature Cards in Cream (#F8F0E3) with Friendly Illustrations & Green Iconography */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_NEXTMIND_FEATURES.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.iconName] || Hammer;
            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl bg-[#F8F0E3] p-7 shadow-[0_18px_40px_-18px_rgba(11,56,42,0.14)] flex flex-col justify-between overflow-hidden group"
              >
                {/* Organic sage blob corner illustration */}
                <svg
                  viewBox="0 0 180 140"
                  fill="none"
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 w-36 h-28 opacity-55 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                >
                  <path
                    d="M42.5 18.2C78.4 -4.5 135.2 4.1 159.4 38.6C183.6 73.1 175.2 124.5 139.8 136.4C104.4 148.3 42.1 120.7 16.8 84.2C-8.5 47.7 6.6 40.9 42.5 18.2Z"
                    fill="#C9D9B9"
                  />
                </svg>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="w-14 h-14 rounded-2xl bg-[#0B382A] text-[#FFF7EB] flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(11,56,42,0.38)]">
                      <IconComponent
                        className="w-6 h-6 text-[#C9D9B9]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFF7EB] text-[#174B38] text-xs font-bold">
                      {feature.badge}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-extrabold text-[#0B382A] tracking-[-0.02em] m-0"
                    style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                  >
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-[#153D30]/90 leading-relaxed m-0">
                    {feature.description}
                  </p>
                </div>

                {/* Custom mini schematic vector bar at bottom */}
                <div className="relative z-10 mt-6 pt-4 border-t border-[#174B38]/10 flex items-center justify-between text-xs font-bold text-[#174B38]">
                  <span>Applied Studio Format</span>
                  <span className="w-6 h-1.5 rounded-full bg-[#A8C8B1] group-hover:w-10 group-hover:bg-[#0B382A] transition-all duration-300" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

