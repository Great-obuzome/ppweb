"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { brand, navigation } = siteContent;

  return (
    <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-7 pb-4 flex items-center justify-between select-none relative z-50">
      {/* Left: Brand Wordmark (all caps, wide letter-spacing, no icon) */}
      <div className="flex-1">
        <Link
          href="/"
          className="text-base sm:text-lg font-bold tracking-[0.25em] uppercase text-[#050409] hover:text-[#1F4633] transition-colors"
        >
          {brand.name}
        </Link>
      </div>

      {/* Center: Clean floating pill links (exactly like Skydive's center pill) */}
      <nav className="hidden md:flex items-center space-x-7 bg-white/70 backdrop-blur-md border border-[#1F4633]/10 shadow-xs px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] text-[#050409]/75">
        {navigation.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-[#1F4633] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: Log in style link + Black pill button (exactly like Skydive's Log in / Make your first agent) */}
      <div className="hidden sm:flex flex-1 items-center justify-end space-x-5">
        <a
          href={navigation.ctaSecondary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-[#050409]/80 hover:text-[#050409] transition-colors"
        >
          {navigation.ctaSecondary.label}
        </a>

        <a
          href={navigation.ctaPrimary.href}
          className="text-xs font-bold uppercase tracking-[0.14em] bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95"
        >
          {navigation.ctaPrimary.label}
        </a>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex sm:hidden items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="p-1.5 text-[#050409] hover:text-[#1F4633] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 bg-[#F7F1DB] border border-[#1F4633]/20 shadow-xl rounded-2xl p-6 flex flex-col space-y-4 md:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 pb-3 border-b border-[#1F4633]/10">
            {navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-[#050409] hover:text-[#1F4633] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <a
              href={navigation.ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs font-bold uppercase tracking-wider text-[#050409] py-2 border border-[#050409]/20 rounded-full hover:border-[#1F4633] transition-colors"
            >
              {navigation.ctaSecondary.label}
            </a>
            <a
              href={navigation.ctaPrimary.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs font-bold uppercase tracking-wider bg-[#050409] text-[#F7F1DB] py-2.5 rounded-full hover:bg-[#1F4633] transition-colors shadow-sm"
            >
              {navigation.ctaPrimary.label}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
