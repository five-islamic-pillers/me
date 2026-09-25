import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixRainCanvas } from './MatrixRainCanvas';
import { LanguageSkill, UserProfile, LanguageCode } from '../types/portfolio';
import { TRANSLATIONS } from '../data/portfolioData';
import { ArrowDown, Code2, ChevronRight, Play, Pause } from 'lucide-react';

interface HeroSectionProps {
  profile: UserProfile;
  languages: LanguageSkill[];
  currentLang: LanguageCode;
  highlightTrigger?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  languages,
  currentLang,
  highlightTrigger,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const isKurdish = currentLang === 'ku';

  // Zoom animation trigger when languages button in header is clicked
  useEffect(() => {
    if (highlightTrigger && highlightTrigger > 0) {
      setIsZooming(true);
      const el = document.getElementById('languages');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const timer = setTimeout(() => {
        setIsZooming(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightTrigger]);

  // Automatically cycle between languages and code snippets every 3.2 seconds
  useEffect(() => {
    if (isPaused || languages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % languages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, languages.length]);

  const selectedLanguage = languages[activeIndex] || languages[0];

  return (
    <section 
      id="top" 
      className="relative min-h-[92vh] flex flex-col justify-between border-b border-emerald-950/70 overflow-hidden"
    >
      {/* Matrix Green Digital Rain Background Animation - Strictly on the Hero section */}
      <MatrixRainCanvas className="absolute inset-0 z-0" />

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 w-full flex-1 flex flex-col justify-center">
        
        {/* Availability Badge */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050e09]/75 border border-emerald-500/40 backdrop-blur-md text-xs text-emerald-300 font-mono-code shadow-lg shadow-black/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isKurdish ? profile.availabilityKu : profile.availability}</span>
          </div>

          <div className="text-xs text-zinc-300 font-mono-code hidden sm:flex items-center gap-2 bg-[#050e09]/60 px-3 py-1 rounded-full border border-emerald-900/40 backdrop-blur-sm">
            <span>{isKurdish ? profile.locationKu : profile.location}</span>
          </div>
        </div>

        {/* Hero Grid: Left side = Name & Role, Right side = Languages I Know */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Name & Engineering Persona */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono-code flex items-center gap-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] pb-1">
                <span>[{t.hero.identityTag}]</span>
                <span className="h-px w-10 bg-emerald-500/60" />
              </div>
              
              {/* Primary Name Display: میر صلاح with clearance so it never overlaps the tag above */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-display pt-2 pb-1 leading-[1.3] sm:leading-[1.25] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {isKurdish ? profile.nameKu : `${profile.name} (${profile.nameKu})`}
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-emerald-300 font-display drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] pt-1">
                {isKurdish ? profile.roleKu : profile.role}
              </p>
            </div>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {isKurdish ? profile.taglineKu : profile.tagline}
            </p>

            {/* Action CTA Group (Direct contact removed as requested) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/30 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.hero.viewProjectsBtn}</span>
                <ChevronRight className={`w-4 h-4 ${isKurdish ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </div>

          {/* Right Column: Languages I Know with cycling codes */}
          <div
            id="languages"
            className="lg:col-span-6 w-full space-y-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              animate={
                isZooming
                  ? {
                      scale: [1, 1.08, 0.97, 1.04, 1],
                      boxShadow: [
                        '0 0 0px rgba(16, 185, 129, 0)',
                        '0 0 50px rgba(16, 185, 129, 0.75)',
                        '0 0 25px rgba(16, 185, 129, 0.4)',
                        '0 0 40px rgba(16, 185, 129, 0.65)',
                        '0 0 0px rgba(16, 185, 129, 0)',
                      ],
                      borderColor: [
                        'rgba(16, 185, 129, 0.4)',
                        'rgba(52, 211, 153, 1)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(52, 211, 153, 1)',
                        'rgba(16, 185, 129, 0.4)',
                      ],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="bg-[#050e09]/75 border border-emerald-500/40 rounded-2xl p-5 backdrop-blur-md shadow-2xl shadow-black/80 space-y-4 relative origin-center"
            >
              
              {/* Header with section title & cycling status */}
              <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold tracking-wider text-emerald-200 uppercase font-mono-code">
                    {t.hero.languagesTitle}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono-code text-zinc-400">
                    {activeIndex + 1}/{languages.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-1 rounded text-zinc-400 hover:text-emerald-300 transition-colors"
                    title={isPaused ? (isKurdish ? 'دەستپێکردنەوەی سووڕان' : 'Resume cycling') : (isKurdish ? 'وەستانی کاتی' : 'Pause cycling')}
                    aria-label="Toggle language auto cycle"
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Grid of Languages Known */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {languages.map((lang, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={lang.name}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`text-left p-2.5 rounded-xl border transition-all relative cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-500/40'
                          : 'bg-[#030906]/65 hover:bg-emerald-950/40 border-emerald-900/60 hover:border-emerald-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-zinc-100 font-mono-code">
                          {isKurdish && lang.nameKu ? lang.nameKu : lang.name}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                        )}
                      </div>
                      
                      <div className="mt-1 flex items-center justify-between text-[11px] font-mono-code">
                        <span className="text-emerald-400 font-semibold truncate">
                          {isKurdish ? lang.experienceDisplayKu : lang.experienceDisplay}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Language Detailed Preview Card with Animated Crossfade */}
              <AnimatePresence mode="wait">
                {selectedLanguage && (
                  <motion.div
                    key={selectedLanguage.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-xl bg-[#030805]/90 border border-emerald-800/60 space-y-3 shadow-inner"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-emerald-300 font-mono-code">
                          {isKurdish && selectedLanguage.nameKu ? selectedLanguage.nameKu : selectedLanguage.name}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono-code">
                          ({isKurdish ? selectedLanguage.experienceDisplayKu : selectedLanguage.experienceDisplay})
                        </span>
                      </div>

                      <span className="text-[10px] font-mono-code text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-0.5 rounded-full">
                        {isKurdish ? selectedLanguage.levelKu : selectedLanguage.level}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-200 leading-relaxed">
                      {isKurdish ? selectedLanguage.descriptionKu : selectedLanguage.description}
                    </p>

                    {/* Simple, clean syntax snippet (e.g. print("Hi World!")) */}
                    <div className="bg-[#020503] p-3 rounded-lg border border-emerald-900/80 font-mono-code text-xs text-emerald-300 overflow-x-auto" dir="ltr">
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-1.5 mb-1.5 border-b border-emerald-950">
                        <span>syntax preview</span>
                        <span className="text-emerald-400">{selectedLanguage.name.toLowerCase()}</span>
                      </div>
                      <pre className="whitespace-pre font-mono-code text-emerald-300">
                        <code>{selectedLanguage.snippet}</code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint with auto-cycle indicator */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-400/80 font-mono-code">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isPaused ? '' : 'animate-ping'}`} />
                  <span>{isPaused ? (isKurdish ? 'وەستاوە' : 'Paused') : (isKurdish ? 'سووڕانەوەی خودکار' : 'Auto-cycling code')}</span>
                </span>
                <span className="text-zinc-400">{t.hero.inspectHint}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator pointing towards Projects */}
        <div className="mt-10 pt-4 flex justify-center">
          <a
            href="#projects"
            className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <span>{isKurdish ? 'سەردانی پڕۆژەکانی میر صلاح بکە' : 'EXPLORE MEER SALAH PROJECTS'}</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-emerald-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
