import React from 'react';
import { Heart, Instagram, Youtube, Globe, Twitter } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: <Instagram className="w-4 h-4 text-purple-700" />, url: "https://www.instagram.com/twicetagram/" },
    { icon: <Youtube className="w-4 h-4 text-purple-700 font-bold" />, url: "https://www.youtube.com/@TWICE" },
    { icon: <Twitter className="w-4 h-4 text-purple-700" />, url: "https://twitter.com/JYPETWICE" },
    { icon: <Globe className="w-4 h-4 text-purple-700" />, url: "http://twice.jype.com/" }
  ];

  return (
    <footer className="bg-purple-950 text-white/90 border-t border-purple-900 py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand Logo inside footer */}
        <div className="flex items-center gap-2.5 mb-6 opacity-90 select-none">
          <svg width="28" height="28" viewBox="0 0 100 100" className="filter hover:brightness-110 transition-all">
            <defs>
              <linearGradient id="footer-twice-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f43f5e', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="30" cy="32" r="16" fill="url(#footer-twice-grad)" />
            <circle cx="70" cy="32" r="16" fill="url(#footer-twice-grad)" />
            <rect x="18" y="58" width="64" height="10" rx="5" fill="url(#footer-twice-grad)" />
            <circle cx="50" cy="80" r="4" fill="url(#footer-twice-grad)" />
          </svg>
          <span className="text-sm font-black tracking-widest text-purple-100 font-display uppercase notranslate">
            TWICE Fan Portal
          </span>
        </div>

        {/* Social channels button links */}
        <div className="flex items-center gap-3.5 mb-8">
          {socialLinks.map((link, idx) => (
            <a 
              key={idx}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-amber-50 hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer flex items-center justify-center"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Legal Disclaimer & credits */}
        <p className="text-[11px] leading-relaxed text-purple-200/80 max-w-xl font-medium">
          版權所有 © {new Date().getFullYear()} TWICE Fan Portal. 本網由全球 ONCE 熱情自製，僅供學習與愛好研究交流之用。
          <br />
          音樂版權、商標、宣傳圖等素材皆歸 <strong>JYP Entertainment</strong> 及 <strong>Warner Music Japan</strong> 所有。
        </p>

        {/* Built label badge */}
        <div className="mt-6 flex items-center gap-1 text-[10px] uppercase font-bold tracking-[2px] text-purple-300 bg-purple-900/40 border border-purple-800/80 px-3.5 py-1.5 rounded-full select-none">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-pink-500 fill-pink-500/85 animate-pulse" />
          <span>for TWICE & ONCE</span>
        </div>

      </div>
    </footer>
  );
}
