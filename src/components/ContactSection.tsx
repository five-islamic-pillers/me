import React, { useState } from 'react';
import { UserProfile, LanguageCode } from '../types/portfolio';
import { Mail, Copy, Check, ExternalLink, Clock, MapPin } from 'lucide-react';
import { TRANSLATIONS } from '../data/portfolioData';

interface ContactSectionProps {
  profile: UserProfile;
  currentLang: LanguageCode;
}

// Custom crisp TikTok icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.48V8.71a8.28 8.28 0 0 0 4.91 1.6V6.86a4.82 4.82 0 0 1-1-.17Z" />
  </svg>
);

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, currentLang }) => {
  const [copied, setCopied] = useState(false);
  const isKurdish = currentLang === 'ku';
  const t = TRANSLATIONS[currentLang];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tiktokUrl = profile.tiktok || 'https://www.tiktok.com/@user.meer07?is_from_webapp=1&sender_device=pc';

  return (
    <section id="contact" className="py-20 border-t border-emerald-950/70 bg-[#070b09]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 pb-8 border-b border-emerald-950/70 text-center sm:text-start">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono-code flex items-center justify-center sm:justify-start gap-2">
            <span>[{t.contact.tag}]</span>
            <span className="h-px w-12 bg-emerald-800/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto sm:mx-0">
            {isKurdish
              ? 'دەتوانیت لە ڕێگەی ئیمەیڵ یاخود پەیجی کەسی تیک تۆکمەوە لە پەیوەندیدا بیت.'
              : 'Connect with me through email or visit my personal TikTok page.'}
          </p>
        </div>

        {/* Side-by-side Contact Channels (Email and TikTok Button next to each other) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Official Email */}
          <div className="p-6 rounded-2xl bg-[#090f0c] border border-emerald-900/60 shadow-xl flex flex-col justify-between space-y-5 hover:border-emerald-700/60 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                  {t.contact.emailLabel}
                </span>
                <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  {isKurdish ? 'ئیمەیڵ' : 'Email'}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-zinc-400 font-mono-code">
                    {isKurdish ? 'ئیمەیڵی فەرمی' : 'Official Inbox'}
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-base sm:text-lg font-bold font-mono-code text-emerald-300 hover:text-white hover:underline truncate block transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-emerald-950/90">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/60 text-emerald-300 text-xs font-mono-code inline-flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.contact.copied : t.contact.copyEmail}</span>
              </button>

              <a
                href={`mailto:${profile.email}`}
                className="py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold font-mono-code inline-flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 active:scale-95 shrink-0"
              >
                <span>{isKurdish ? 'ئیمەیڵ بنێرە' : 'Send Email'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Personal TikTok Page (Right next to email) */}
          <div className="p-6 rounded-2xl bg-[#090f0c] border border-emerald-900/60 shadow-xl flex flex-col justify-between space-y-5 hover:border-emerald-700/60 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                  {t.contact.tiktokLabel}
                </span>
                <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                  TikTok
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <TikTokIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-zinc-300 font-mono-code">
                    تیکتۆکەکی من | my tiktok profile
                  </div>
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-lg font-bold font-mono-code text-emerald-300 hover:text-white hover:underline truncate block transition-colors"
                  >
                    @user.meer07
                  </a>
                </div>
              </div>
            </div>

            {/* TikTok Action Button */}
            <div className="pt-4 border-t border-emerald-950/90">
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold font-mono-code inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <TikTokIcon className="w-4 h-4" />
                <span>تیکتۆکەکی من | my tiktok profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Info footer banner */}
        <div className="p-4 rounded-2xl bg-[#060b08] border border-emerald-950/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isKurdish ? profile.locationKu : profile.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.contact.responseTimes}:</span>
            <span className="text-emerald-400 font-semibold">{t.contact.within12h}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
