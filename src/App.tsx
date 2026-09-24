import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

import {
  MEER_PROFILE,
  MEER_LANGUAGES,
  MEER_PROJECTS,
} from './data/portfolioData';
import { Project, LanguageCode } from './types/portfolio';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('meer_portfolio_lang');
      return (saved === 'en' || saved === 'ku') ? saved : 'ku';
    } catch {
      return 'ku';
    }
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [languagesHighlightCount, setLanguagesHighlightCount] = useState(0);

  // Sync document direction and lang with chosen language
  useEffect(() => {
    if (currentLang === 'ku') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ku';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    try {
      localStorage.setItem('meer_portfolio_lang', currentLang);
    } catch {
      // ignore
    }
  }, [currentLang]);

  const handleToggleLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
  };

  const handleLanguagesClick = () => {
    setLanguagesHighlightCount((prev) => prev + 1);
  };

  const displayName = currentLang === 'ku' ? MEER_PROFILE.nameKu : MEER_PROFILE.name;

  return (
    <div className="min-h-screen bg-[#070b09] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation Bar with Language Toggles (English / کوردی) and no terminal */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onLanguagesClick={handleLanguagesClick}
        name={displayName}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section: Matrix green digital rain background with Meer's name (میر صڵاح) and languages known (HTML 1.5y, CSS 1.5y, JS 1.5y, Python 5m) */}
        <HeroSection
          profile={MEER_PROFILE}
          languages={MEER_LANGUAGES}
          currentLang={currentLang}
          highlightTrigger={languagesHighlightCount}
        />

        {/* Featured Projects Section: Live URLs for Meer-YT, Five Islamic Pillars, and Kurdish AI */}
        <ProjectsSection
          projects={MEER_PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
          currentLang={currentLang}
        />

        {/* Contact Section: Where to contact Meer Salah at meerjeer22@gmail.com */}
        <ContactSection
          profile={MEER_PROFILE}
          currentLang={currentLang}
        />
      </main>

      {/* Site Footer */}
      <Footer
        name={displayName}
        currentLang={currentLang}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        currentLang={currentLang}
      />
    </div>
  );
}
