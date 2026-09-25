import React from 'react';
import { Project, LanguageCode } from '../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, Globe, Sparkles, Layers } from 'lucide-react';
import { TRANSLATIONS } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, currentLang }) => {
  if (!project) return null;
  const isKurdish = currentLang === 'ku';
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#090f0c] border border-emerald-900/60 rounded-2xl shadow-2xl text-zinc-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-emerald-950/80 bg-[#090f0c]/95 backdrop-blur-md">
          <div className="space-y-1">
            <div className="text-xs font-mono-code text-emerald-400">
              <span>{project.year}</span>
              <span className="mx-2 text-zinc-600">·</span>
              <span>{isKurdish ? project.roleKu : project.role}</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white">
              {isKurdish ? project.titleKu : project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1 text-sm">
          {/* Project Image Banner if available */}
          {project.imageUrl && (
            <div className="w-full h-56 rounded-xl overflow-hidden border border-emerald-800/50 relative bg-black shadow-lg">
              <img
                src={project.imageUrl}
                alt={isKurdish ? project.titleKu : project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090f0c] via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Tagline & Live URL Notice */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-emerald-200 font-medium">
              {isKurdish ? project.taglineKu : project.tagline}
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>{t.projects.viewLive}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono-code">
              {isKurdish ? 'دەربارەی پڕۆژە' : 'About Project'}
            </h3>
            <p className="text-zinc-300 leading-relaxed">
              {isKurdish ? project.descriptionKu : project.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono-code">
              {t.projects.keyFeatures}
            </h3>
            <ul className="space-y-2 text-zinc-300">
              {(isKurdish ? project.featuresKu : project.features).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Live URL */}
          <div className="p-3.5 rounded-lg bg-[#060b08] border border-emerald-950/80 font-mono-code text-xs space-y-1">
            <span className="text-zinc-400">{t.projects.directLink}</span>
            <div className="text-emerald-400 break-all select-all">
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">
                {project.liveUrl}
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-2 border-t border-emerald-950/80 space-y-2">
            <span className="text-xs font-mono-code text-zinc-400">
              {isKurdish ? 'تەکنەلۆژیاکانی بەکارهاتوون:' : 'Tech Stack Used:'}
            </span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-200 font-mono-code">
              {project.techStack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="text-emerald-300 font-semibold">{tech}</span>
                  {i < project.techStack.length - 1 && (
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-emerald-950/80 bg-[#070c09]">
          <span className="text-xs text-zinc-500 font-mono-code">
            {isKurdish ? 'دروستکراوە لەلایەن میر صلاح' : 'Created by Meer Salah'}
          </span>

          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.projects.viewLive}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
