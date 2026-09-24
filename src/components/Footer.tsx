import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LanguageCode } from '../types/portfolio';
import { TRANSLATIONS } from '../data/portfolioData';

interface FooterProps {
  name: string;
  currentLang: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ name, currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const isKurdish = currentLang === 'ku';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-emerald-950/80 bg-[#050806] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400 font-mono-code">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-zinc-200 font-semibold">
            {name} · {isKurdish ? 'پۆرتفۆلیۆی فەرمی' : 'Official Portfolio'}
          </div>
          <div className="text-zinc-500">
            {t.footer.builtWith}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="mailto:meerjeer22@gmail.com"
            className="hover:text-emerald-400 transition-colors"
          >
            meerjeer22@gmail.com
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
