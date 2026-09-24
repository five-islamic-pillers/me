import React from 'react';
import { motion } from 'framer-motion';
import { Project, LanguageCode } from '../types/portfolio';
import { ExternalLink, Eye } from 'lucide-react';
import { TRANSLATIONS } from '../data/portfolioData';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  currentLang: LanguageCode;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  currentLang,
}) => {
  const isKurdish = currentLang === 'ku';
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header with smooth reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="space-y-3 pb-10 border-b border-emerald-950/70"
      >
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono-code flex items-center gap-2">
          <span>[{t.projects.tag}]</span>
          <span className="h-px w-12 bg-emerald-800/60" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          {t.projects.title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          {t.projects.subtitle}
        </p>
      </motion.div>

      {/* Projects Grid with Framer Motion fade-in & slide-up on viewport reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group rounded-2xl bg-[#090f0c] border border-emerald-950 hover:border-emerald-700/60 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/40"
          >
            {/* Visual Top Preview Frame */}
            <div className="h-44 bg-[#060b08] border-b border-emerald-950/80 relative p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-mono-code text-zinc-400">
                  {project.year} · {isKurdish ? project.roleKu : project.role}
                </span>
                <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950/80 border border-emerald-900/60 px-2.5 py-0.5 rounded uppercase">
                  {isKurdish ? project.categoryKu : project.category}
                </span>
              </div>

              {/* Dynamic decorative visual icon or image thumbnail */}
              {project.imageUrl ? (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={isKurdish ? project.titleKu : project.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-transparent to-[#060b08]/50" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 group-hover:opacity-60 transition-opacity">
                  {project.previewType === 'ai' && (
                    <svg className="w-full h-full text-emerald-400" viewBox="0 0 200 100" fill="none">
                      <circle cx="100" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                      <circle cx="100" cy="50" r="12" fill="#10b981" />
                      <line x1="20" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="130" y1="50" x2="180" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                  {project.previewType === 'game' && (
                    <svg className="w-full h-full text-emerald-400" viewBox="0 0 200 100" fill="none">
                      <rect x="30" y="30" width="16" height="50" rx="3" fill="currentColor" />
                      <rect x="65" y="25" width="16" height="55" rx="3" fill="currentColor" />
                      <rect x="100" y="20" width="16" height="60" rx="3" fill="#34d399" />
                      <rect x="135" y="25" width="16" height="55" rx="3" fill="currentColor" />
                      <rect x="170" y="30" width="16" height="50" rx="3" fill="currentColor" />
                    </svg>
                  )}
                  {project.previewType === 'media' && (
                    <svg className="w-full h-full text-emerald-400" viewBox="0 0 200 100" fill="none">
                      <rect x="40" y="20" width="120" height="65" rx="10" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="90,40 120,52 90,65" fill="#34d399" />
                    </svg>
                  )}
                </div>
              )}

              {/* Status / Metric */}
              <div className="z-10 flex items-center justify-between text-xs font-mono-code text-emerald-300">
                <span className="font-bold truncate">
                  {isKurdish ? project.impactMetricKu : project.impactMetric}
                </span>
                <span className="text-[11px] text-zinc-400 group-hover:text-emerald-400 transition-colors">
                  {t.projects.details} →
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                  {isKurdish ? project.titleKu : project.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                  {isKurdish ? project.taglineKu : project.tagline}
                </p>
              </div>

              {/* Tech Stack Metadata */}
              <div className="pt-3 border-t border-emerald-950/70 space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-mono-code">
                  {project.techStack.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="text-zinc-300">{tech}</span>
                      {i < project.techStack.length - 1 && (
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Card Action Handlers */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-mono-code py-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.projects.details}</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-400 hover:text-zinc-950 text-emerald-300 font-semibold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>{t.projects.viewLive}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
