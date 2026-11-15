"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageSquareText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function FinalCtaAndFooter({
  onExploreProgrammes,
  onOpenEnquiry,
  onOpenRegister,
  onOpenLegal,
}) {
  return (
    <>
      {/* SECTION 8: FINAL CTA — Large Forest-Green Organic Section with Cream Typography */}
      <section className="relative py-20 lg:py-24 bg-[#FFF7EB] px-5 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="relative rounded-[36px] bg-gradient-to-br from-[#082F24] via-[#0B382A] to-[#174B38] text-[#FFF7EB] p-8 sm:p-14 lg:p-18 shadow-[0_30px_70px_-20px_rgba(8,47,36,0.5)] overflow-hidden">
            {/* Organic abstract sage shapes inside the Final CTA */}
            <svg
              viewBox="0 0 600 400"
              fill="none"
              aria-hidden="true"
              className="absolute -right-24 -bottom-24 w-[480px] h-[360px] opacity-25 pointer-events-none"
            >
              <path
                d="M112.4 58.2C205.6 12.4 352.1 18.9 448.2 84.5C544.3 150.1 589.8 274.8 532.4 348.2C475 421.6 314.7 443.7 192.4 401.2C70.1 358.7 -14.2 251.6 12.8 164.2C39.8 76.8 19.2 104 112.4 58.2Z"
                fill="#C9D9B9"
              />
            </svg>

            <div className="relative z-10 max-w-2xl">
              <h2
                className="text-3xl sm:text-5xl font-extrabold text-[#FFF7EB] tracking-[-0.03em] leading-[1.08] m-0"
                style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
              >
                Your next opportunity starts with a new skill.
              </h2>

              <p className="mt-4 text-base sm:text-xl text-[#C9D9B9] leading-relaxed m-0">
                Start exploring practical AI and digital skills today.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreProgrammes}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FFF7EB] hover:bg-[#C9D9B9] text-[#0B382A] font-extrabold text-base shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Explore Programmes</span>
                  <ArrowRight className="w-4 h-4 text-[#0B382A]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenEnquiry()}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#174B38] hover:bg-[#174B38]/80 text-[#FFF7EB] border border-[#C9D9B9]/35 font-bold text-base transition-all cursor-pointer active:scale-[0.98]"
                >
                  <MessageSquareText
                    className="w-4 h-4 text-[#C9D9B9]"
                    aria-hidden="true"
                  />
                  <span>Speak to an Advisor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="bg-[#082F24] text-[#FFF7EB] pt-18 pb-12 border-t border-[#174B38]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#174B38]">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <a
                href="#home"
                className="inline-flex items-center gap-2.5 text-decoration-none"
              >
                <span className="w-10 h-10 rounded-xl bg-[#174B38] border border-[#C9D9B9]/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#C9D9B9]" aria-hidden="true" />
                </span>
                <span
                  className="font-extrabold text-2xl tracking-[-0.03em] text-[#FFF7EB]"
                  style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                >
                  NEXT<span className="text-[#C9D9B9]">MIND</span>
                </span>
              </a>

              <p className="mt-4 text-sm text-[#FFF7EB]/80 leading-relaxed max-w-sm">
                Practical AI, automation and digital technology programmes for
                college students, graduates and young professionals. Don&apos;t
                just learn about AI. Learn to build with it.
              </p>

              {/* Social Media Links */}
              <div className="mt-6 flex items-center gap-3">
                {[
                  { label: "LinkedIn", href: "#linkedin" },
                  { label: "GitHub", href: "#github" },
                  { label: "YouTube", href: "#youtube" },
                  { label: "X", href: "#x" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenEnquiry();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#174B38]/70 hover:bg-[#C9D9B9] text-[#FFF7EB] hover:text-[#082F24] text-xs font-bold transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#C9D9B9] mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 list-none m-0 p-0 text-sm">
                <li>
                  <a
                    href="#home"
                    className="text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    className="text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors"
                  >
                    Why NEXTMIND
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#resources"
                    className="text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors"
                  >
                    Project Showcase
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Programme Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#C9D9B9] mb-4">
                Programmes
              </h3>
              <ul className="space-y-2.5 list-none m-0 p-0 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenRegister("ai-foundations")}
                    className="text-left text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors cursor-pointer"
                  >
                    AI Foundations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenRegister("ai-and-automation")}
                    className="text-left text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors cursor-pointer"
                  >
                    AI &amp; Automation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenRegister("digital-product-and-technology")
                    }
                    className="text-left text-[#FFF7EB]/85 hover:text-[#C9D9B9] transition-colors cursor-pointer"
                  >
                    Digital Product &amp; Technology
                  </button>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-[#C9D9B9] font-semibold hover:underline"
                  >
                    Dedicated Registration Portal →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information Placeholder */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#C9D9B9] mb-4">
                Contact Information (Placeholder)
              </h3>
              <ul className="space-y-3 list-none m-0 p-0 text-sm text-[#FFF7EB]/85">
                <li className="flex items-start gap-2.5">
                  <Mail
                    className="w-4 h-4 text-[#C9D9B9] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>admissions@nextmind.edu (Editable Placeholder)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone
                    className="w-4 h-4 text-[#C9D9B9] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>+91 (000) 000-0000 (Advisor Desk Placeholder)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-[#C9D9B9] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>NEXTMIND Learning Hub (Location Placeholder)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Privacy Policy, Terms & Conditions, Admin Link */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF7EB]/75">
            <p className="m-0">
              © {new Date().getFullYear()} NEXTMIND Education. All rights
              reserved.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => onOpenLegal("privacy")}
                className="hover:text-[#C9D9B9] underline underline-offset-4 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal("terms")}
                className="hover:text-[#C9D9B9] underline underline-offset-4 cursor-pointer"
              >
                Terms and Conditions
              </button>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#174B38] text-[#C9D9B9] hover:bg-[#C9D9B9] hover:text-[#082F24] font-bold transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

