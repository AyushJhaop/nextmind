"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  SearchCheck,
  Globe,
  CalendarClock,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { PROJECT_SHOWCASE_ITEMS } from "@/data/programmes";

const PROJECT_ICONS = {
  "proj-assistant": Bot,
  "proj-workflow": Workflow,
  "proj-research": SearchCheck,
  "proj-portfolio": Globe,
  "proj-productivity": CalendarClock,
};

export default function ProjectShowcaseSection({ onEnrolWithProgramme }) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "AI Foundations",
    "AI & Automation",
    "Digital Product & Technology",
  ];

  const visibleProjects =
    selectedFilter === "All"
      ? PROJECT_SHOWCASE_ITEMS
      : PROJECT_SHOWCASE_ITEMS.filter((p) => p.programme === selectedFilter);

  return (
    <section
      id="resources"
      className="relative py-20 lg:py-28 bg-[#F8F0E3] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0B382A] tracking-[-0.03em] leading-[1.1] m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Learn it. Build it. Show it.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-[#153D30]/90 leading-relaxed m-0">
              Explore the types of guided prototypes and portfolio artefacts
              learners construct inside NEXTMIND build labs.
            </p>
          </div>

          {/* Transparent disclosure banner as required by prompt */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#FFF7EB] border border-[#174B38]/15 text-xs sm:text-sm font-semibold text-[#174B38]">
            <Info className="w-4 h-4 text-[#0B382A] shrink-0" aria-hidden="true" />
            <span>
              All cards below represent{" "}
              <strong className="text-[#0B382A]">Example Learning Projects</strong>{" "}
              from the curriculum.
            </span>
          </div>
        </div>

        {/* Programme Filter Tabs */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter example learning projects by programme"
        >
          {filters.map((filter) => {
            const active = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                aria-pressed={active}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-[#0B382A] text-[#FFF7EB] shadow-md"
                    : "bg-[#FFF7EB] text-[#153D30] hover:bg-[#C9D9B9]/45"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Project Preview Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProjects.map((project, idx) => {
            const Icon = PROJECT_ICONS[project.id] || Bot;
            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-[#FFF7EB] shadow-[0_18px_40px_-16px_rgba(11,56,42,0.14)] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Visual Preview Header */}
                  <div className="relative bg-gradient-to-br from-[#0B382A] via-[#174B38] to-[#082F24] p-6 text-[#FFF7EB]">
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="px-3 py-1 rounded-full bg-[#C9D9B9]/20 border border-[#C9D9B9]/40 text-[#C9D9B9] text-[11px] font-extrabold uppercase tracking-wider">
                        {project.label}
                      </span>
                      <span className="text-xs font-semibold text-[#FFF7EB]/80">
                        {project.previewMetric}
                      </span>
                    </div>

                    {/* Interactive-looking schematic preview window */}
                    <div className="rounded-xl bg-[#082F24]/80 border border-[#C9D9B9]/20 p-4 flex items-center gap-3.5">
                      <span className="w-12 h-12 rounded-xl bg-[#C9D9B9] text-[#082F24] flex items-center justify-center shrink-0 shadow-sm">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#C9D9B9] m-0">
                          {project.programme}
                        </p>
                        <p className="text-sm font-extrabold text-[#FFF7EB] truncate m-0">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-extrabold text-[#0B382A] tracking-[-0.02em] m-0"
                      style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#153D30]/90 leading-relaxed m-0">
                      {project.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#F8F0E3] text-[#174B38] text-xs font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const slugMap = {
                        "AI Foundations": "ai-foundations",
                        "AI & Automation": "ai-and-automation",
                        "Digital Product & Technology":
                          "digital-product-and-technology",
                      };
                      onEnrolWithProgramme(
                        slugMap[project.programme] || "ai-foundations"
                      );
                    }}
                    className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#F8F0E3] hover:bg-[#C9D9B9]/55 text-[#0B382A] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <span>Build this in {project.programme}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#174B38]" aria-hidden="true" />
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

