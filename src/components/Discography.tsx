import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Calendar, Flame, Youtube, X } from 'lucide-react';
import { albums, Album } from '../data';

interface AlbumModalProps {
  album: Album | null;
  onClose: () => void;
}

export function AlbumModal({ album, onClose }: AlbumModalProps) {
  useEffect(() => {
    if (album) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [album]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!album) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop layout */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal body dialogue sheet */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-gradient-to-br from-[#faf5ff] to-[#fffbfc] rounded-3xl border-2 w-full max-w-xl shadow-2xl relative overflow-hidden z-10 max-h-[85vh] flex flex-col"
          style={{ 
            borderColor: album.color,
            boxShadow: `0 20px 50px -15px ${album.color}50` 
          }}
        >
          {/* Top colored accent banner */}
          <div className="h-2 w-full" style={{ backgroundColor: album.color }} />

          {/* Close button icon */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-purple-950 rounded-full hover:rotate-90 transition-all duration-300 cursor-pointer shadow-xs border border-purple-100 z-10"
            aria-label="Close album modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrollable contents wrapper */}
          <div className="overflow-y-auto p-6 md:p-8 flex-1">
            <div className="flex items-center gap-5 pb-6 border-b border-purple-100">
              {album.coverUrl ? (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-purple-100 shadow-xs shrink-0 bg-purple-50/50 flex items-center justify-center">
                  <img 
                    src={album.coverUrl} 
                    alt={album.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover animate-fade-in"
                    id="modal-album-cover"
                  />
                </div>
              ) : (
                <span className="text-4xl md:text-5xl bg-white p-3.5 rounded-2xl border border-purple-100 shadow-xs flex items-center justify-center select-none shrink-0" id="modal-album-icon">
                  {album.icon}
                </span>
              )}

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-purple-950 leading-tight font-display">
                  {album.title}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 font-bold">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full text-white tracking-wider font-mono" style={{ backgroundColor: album.color }}>
                    {album.year} 年
                  </span>
                  <span className="text-[11px] text-purple-500 font-extrabold tracking-widest uppercase">
                    OFFICIAL ALBUM
                  </span>
                </div>
              </div>
            </div>

            {/* Album Summary Text */}
            <div className="my-6 bg-purple-50/50 border border-purple-100/50 rounded-2xl p-5 relative">
              <h4 className="text-[10px] font-black tracking-widest text-purple-800 uppercase mb-2">
                專輯大綱 Introduction
              </h4>
              <p className="text-[13px] leading-relaxed text-purple-950 font-medium">
                {album.description}
              </p>
            </div>

            {/* Playlist Tracklist cards */}
            <div className="bg-amber-50/20 border border-amber-200/40 rounded-2xl p-5">
              <h4 className="text-[11px] font-black tracking-widest text-purple-800 uppercase mb-4 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                <span>收錄曲與影片連結 Tracklist</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {album.songs.map((song, idx) => (
                  <a 
                    key={song.name + idx}
                    href={song.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group bg-white hover:bg-purple-100/40 hover:border-purple-300 border border-purple-100 rounded-xl p-3.5 flex items-center justify-between text-purple-950 font-bold text-xs transition-all duration-200 shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pr-2 overflow-hidden">
                      <span className="font-extrabold text-[10px] text-purple-400 font-mono w-4">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate group-hover:text-purple-700 transition-colors">
                        {song.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-pink-500 font-extrabold text-[10px] bg-pink-50 border border-pink-100/60 px-2 py-1 rounded-lg group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-200">
                      <Youtube className="w-3.5 h-3.5 fill-current" />
                      <span>YouTube</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function Discography() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="discography" className="scroll-mt-24 px-6 py-20 bg-[#f9f5ff]/60 border-y border-purple-100">
      <div className="max-w-7xl mx-auto">
        {/* Title Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-2xs">
            <Music className="w-3.5 h-3.5" />
            <span>MUSIC Discography</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-purple-950 tracking-tight font-display">
            經典<span className="text-pink-600 drop-shadow-3xs px-1.5 underline decoration-wavy decoration-purple-400">音樂作品</span> 🎵
          </h2>
          <p className="text-purple-700 font-medium text-sm max-w-lg mx-auto mt-4 leading-relaxed">
            重溫 TWICE 歷年來的音樂軌跡，點擊專輯卡片可解鎖曲目詳情與官方影片連結！
          </p>
        </div>

        {/* Albums grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {albums.map((album, idx) => {
            const tiltAngle = idx % 2 === 0 ? '-1.5deg' : '1.5deg';
            return (
              <motion.div
                key={album.title + idx}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: tiltAngle, 
                  y: -5,
                  boxShadow: `0 20px 40px -15px ${album.color}50`
                }}
                onClick={() => setSelectedAlbum(album)}
                className="group cursor-pointer rounded-2xl p-4 text-center border bg-white transition-all duration-300 flex flex-col justify-between items-center shadow-2xs"
                style={{ borderColor: `${album.color}80` }}
              >
                <div className="w-full">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 border border-purple-100/50 shadow-2xs flex items-center justify-center bg-purple-50/50">
                    {album.coverUrl ? (
                      <img 
                        src={album.coverUrl} 
                        alt={album.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-500"
                        id={`cover-${idx}`}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-4xl select-none transform group-hover:scale-110 transition-transform duration-300">
                        {album.icon}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  
                  <h3 className="font-extrabold text-purple-950 text-sm leading-snug group-hover:text-purple-700 transition-colors mt-2 line-clamp-2 px-1">
                    {album.title}
                  </h3>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-black">
                  <Calendar className="w-3.5 h-3.5 opacity-60 text-purple-400" />
                  <span style={{ color: album.color }}>{album.year} 年</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pop up dialogue detail of the selected album */}
      {selectedAlbum && (
        <AlbumModal 
          album={selectedAlbum} 
          onClose={() => setSelectedAlbum(null)} 
        />
      )}
    </section>
  );
}
