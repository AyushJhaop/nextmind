"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyNextmindSection from "@/components/WhyNextmindSection";
import ProgrammesSection from "@/components/ProgrammesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhatYoullGainSection from "@/components/WhatYoullGainSection";
import ProjectShowcaseSection from "@/components/ProjectShowcaseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaAndFooter from "@/components/FinalCtaAndFooter";
import {
  RegistrationModal,
  EnquiryModal,
  ProgrammeDetailModal,
  LegalModal,
} from "@/components/ConversionModals";

export default function HomePage() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedProgrammeSlug, setSelectedProgrammeSlug] =
    useState("ai-foundations");

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryDefaultProgramme, setEnquiryDefaultProgramme] =
    useState("AI Foundations");

  const [detailProgramme, setDetailProgramme] = useState(null);
  const [legalModalType, setLegalModalType] = useState(null);
  const [liveCounts, setLiveCounts] = useState({});

  const fetchProgrammesCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/programmes");
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.programmes)) {
        const map = {};
        for (const p of data.programmes) {
          map[p.slug] = p._count?.registrations || 0;
        }
        setLiveCounts(map);
      }
    } catch {
      // Ignore silent background count refresh error
    }
  }, []);

  useEffect(() => {
    fetchProgrammesCounts();
  }, [fetchProgrammesCounts]);

  const handleOpenRegister = (programmeSlug = "ai-foundations") => {
    setSelectedProgrammeSlug(programmeSlug || "ai-foundations");
    setRegisterModalOpen(true);
  };

  const handleOpenEnquiry = (programmeTitle = "AI Foundations") => {
    setEnquiryDefaultProgramme(programmeTitle || "AI Foundations");
    setEnquiryModalOpen(true);
  };

  const handleExploreProgrammes = () => {
    const el = document.getElementById("programmes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7EB] text-[#153D30]">
      <Navbar
        onOpenRegister={() => handleOpenRegister("ai-foundations")}
        onOpenEnquiry={() => handleOpenEnquiry("AI Foundations")}
      />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION — Strict Reference Composition */}
        <HeroSection
          onExploreProgrammes={handleExploreProgrammes}
          onOpenEnquiry={() => handleOpenEnquiry("AI Foundations")}
          onOpenRegister={(slug) => handleOpenRegister(slug)}
        />

        {/* SECTION 1: WHY NEXTMIND? */}
        <WhyNextmindSection />

        {/* SECTION 2: EXPLORE OUR PROGRAMMES */}
        <ProgrammesSection
          liveCounts={liveCounts}
          onEnrolProgramme={(slug) => handleOpenRegister(slug)}
          onViewProgramme={(prog) => setDetailProgramme(prog)}
        />

        {/* SECTION 3: HOW IT WORKS */}
        <HowItWorksSection />

        {/* SECTION 4: WHAT YOU'LL GAIN */}
        <WhatYoullGainSection />

        {/* SECTION 5: PROJECT SHOWCASE */}
        <ProjectShowcaseSection
          onEnrolWithProgramme={(slug) => handleOpenRegister(slug)}
        />

        {/* SECTION 6: STUDENT TESTIMONIALS */}
        <TestimonialsSection />

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        <FaqSection
          onOpenEnquiry={() =>
            handleOpenEnquiry("Unsure — Need Advisor Guidance")
          }
        />
      </main>

      {/* SECTION 8: FINAL CTA & SECTION 9: FOOTER */}
      <FinalCtaAndFooter
        onExploreProgrammes={handleExploreProgrammes}
        onOpenEnquiry={() => handleOpenEnquiry("AI Foundations")}
        onOpenRegister={(slug) => handleOpenRegister(slug)}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* CONVERSION JOURNEY A: MULTI-STEP PROGRAMME REGISTRATION MODAL */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialProgrammeSlug={selectedProgrammeSlug}
        onSuccessComplete={() => fetchProgrammesCounts()}
      />

      {/* CONVERSION JOURNEY B: TALK TO AN ADVISOR ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultProgramme={enquiryDefaultProgramme}
      />

      {/* PROGRAMME CURRICULUM OVERVIEW MODAL */}
      <ProgrammeDetailModal
        programme={detailProgramme}
        isOpen={Boolean(detailProgramme)}
        onClose={() => setDetailProgramme(null)}
        onEnrolProgramme={(slug) => handleOpenRegister(slug)}
      />

      {/* PRIVACY POLICY & TERMS MODAL */}
      <LegalModal
        type={legalModalType}
        isOpen={Boolean(legalModalType)}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}

