import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { LanguageCode } from '../types/portfolio';
import { TRANSLATIONS } from '../data/portfolioData';

interface NavbarProps {
  currentLang: LanguageCode;
  onToggleLang: (lang: LanguageCode) => void;
  onLanguagesClick: () => void;
  name?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onToggleLang, onLanguagesClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/70 bg-[#070b09]/92 backdrop-blur-md" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        
        {/* Left Side: Language Toggle (Strictly to the left) */}
        <div className="flex items-center">
          <div className="flex items-center p-1 rounded-lg bg-[#0d1612] border border-emerald-900/60 shadow-inner">
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentLang === 'en'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              English
            </button>
            <div className="h-3.5 w-px bg-emerald-900/50 mx-1" />
            <button
              type="button"
              onClick={() => onToggleLang('ku')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentLang === 'ku'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              کوردی
            </button>
          </div>
        </div>

        {/* Center / Middle: Contact Meer Button (Hidden on phones/mobile screens) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/25 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.nav.letsTalk}</span>
          </a>
        </div>

        {/* Right Side: Navigation Links & Mobile Toggle (Far-right contact button removed as requested) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <button
              type="button"
              onClick={onLanguagesClick}
              className="hover:text-emerald-400 transition-colors cursor-pointer font-medium"
            >
              {t.nav.languages}
            </button>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">
              {t.nav.projects}
            </a>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-emerald-400 focus:outline-none rounded-lg bg-emerald-950/40 border border-emerald-900/60 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-950/80 bg-[#090f0c] px-4 pt-3 pb-5 space-y-2 text-sm font-medium shadow-2xl">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onLanguagesClick();
            }}
            className="w-full text-left rtl:text-right block px-3 py-2.5 rounded-lg text-zinc-200 hover:bg-emerald-950/50 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {t.nav.languages}
          </button>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-zinc-200 hover:bg-emerald-950/50 hover:text-emerald-400 transition-colors"
          >
            {t.nav.projects}
          </a>
          <a
            href="https://www.tiktok.com/@user.meer07?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 font-semibold transition-colors"
          >
            تیکتۆکەکی من | my tiktok profile ↗
          </a>
        </div>
      )}
    </header>
  );
};
