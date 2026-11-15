"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Programmes", href: "#programmes" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about-us" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar({ onOpenRegister, onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF7EB]/95 backdrop-blur-md shadow-[0_10px_30px_-14px_rgba(11,56,42,0.16)] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: NEXTMIND Wordmark */}
        <a
          href="#home"
          className="group inline-flex items-center gap-2.5 text-decoration-none focus:outline-none"
          aria-label="NEXTMIND Home"
        >
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              scrolled
                ? "bg-[#0B382A] text-[#FFF7EB]"
                : "bg-[#FFF7EB] text-[#0B382A] lg:bg-[#FFF7EB]/16 lg:text-[#FFF7EB] lg:border lg:border-[#FFF7EB]/30"
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#C9D9B9]" aria-hidden="true" />
          </span>
          <span
            className={`font-extrabold text-xl sm:text-2xl tracking-[-0.03em] transition-colors duration-300 ${
              scrolled
                ? "text-[#0B382A]"
                : "text-[#FFF7EB]"
            }`}
            style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
          >
            NEXT<span className="text-[#C9D9B9] group-hover:text-[#A8C8B1]">MIND</span>
          </span>
        </a>

        {/* Centre: Primary Navigation Links */}
        <nav
          aria-label="Primary"
          className={`hidden lg:flex items-center gap-1 px-5 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#F8F0E3] border border-[#174B38]/12"
              : "bg-[#FFF7EB]/90 backdrop-blur-md border border-[#174B38]/12 shadow-[0_10px_28px_-12px_rgba(11,56,42,0.18)]"
          }`}
        >
          <ul className="flex items-center gap-1 list-none m-0 p-0" role="list">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-[#153D30] hover:bg-[#C9D9B9]/45 hover:text-[#082F24] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Dark forest-green rounded button: Get Started */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenRegister()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm shadow-[0_12px_24px_-8px_rgba(11,56,42,0.45)] hover:shadow-[0_16px_28px_-6px_rgba(11,56,42,0.55)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors cursor-pointer ${
            scrolled
              ? "bg-[#0B382A] text-[#FFF7EB]"
              : "bg-[#FFF7EB] text-[#0B382A] shadow-md"
          }`}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden mx-4 mt-3 rounded-2xl bg-[#FFF7EB] border border-[#174B38]/20 shadow-[0_24px_48px_-12px_rgba(8,47,36,0.38)] p-5"
        >
          <nav aria-label="Mobile Primary">
            <ul className="flex flex-col gap-1.5 list-none m-0 p-0" role="list">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-bold text-[#153D30] hover:bg-[#C9D9B9]/40 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-[#174B38]/15 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-5 rounded-full bg-[#0B382A] text-[#FFF7EB] font-bold text-sm text-center shadow-md cursor-pointer"
              >
                Get Started
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 px-5 rounded-full bg-[#F8F0E3] border border-[#174B38]/25 text-[#153D30] font-bold text-sm text-center cursor-pointer"
              >
                Talk to an Advisor
              </button>
            </div>
            <div className="mt-3 flex justify-between items-center px-2 text-xs text-[#174B38]">
              <span>Practical AI & Digital Skills</span>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold underline underline-offset-4"
              >
                Admin Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

