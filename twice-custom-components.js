=== FILE: About.tsx (Local Source Extract) ===
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Star, Users, Award } from 'lucide-react';

export default function About() {
  const cards = [
    { icon: <Calendar className="w-5 h-5 text-purple-600" />, title: "出道年份", value: "2015 年 10 月" },
    { icon: <Users className="w-5 h-5 text-pink-600" />, title: "成員人數", value: "9 人 (全體續約)" },
    { icon: <Award className="w-5 h-5 text-amber-600" />, title: "打歌一位次數", value: "K-pop 女團歷史第一" }
  ];

  return (
    <section id="about" className="scroll-mt-24 px-6 py-20 bg-gradient-to-b from-[#f4f0fa] to-amber-50/20 border-t border-purple-100/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title Tag */}
        <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>ABOUT US</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight font-display">
          關於 <span className="text-purple-600">TWICE Fan Portal</span> 🌟
        </h2>
        <p className="text-purple-900 font-semibold text-sm leading-relaxed mt-6 max-w-2xl mx-auto">
          本平台是由熱愛 TWICE 的萬千 ONCE 粉絲共同維護的非官方中文化入口網。在經歷了無數打歌奪冠、巡演與璀璨續約的極致时刻後，我們旨在為新老歌迷提供最全、最精準、最具美感的成員科普、歷年專頁大綱、重要紀念里程碑、以及同步直達 JYP Shop 周邊預購的通道。
        </p>

        {/* Info Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-purple-50 rounded-full mb-3.5 flex items-center justify-center">
                {card.icon}
              </div>
              <span className="text-[11px] font-black tracking-widest text-purple-400 uppercase">
                {card.title}
              </span>
              <span className="text-base font-black text-purple-950 mt-2 font-display">
                {card.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Closing Greeting Slogan */}
        <div className="mt-14 font-display text-lg sm:text-xl font-bold italic tracking-wide text-purple-800">
          「One in a Million, 我們是 TWICE！」🍭
        </div>
      </div>
    </section>
  );
}



=== FILE: CartDrawer.tsx (Local Source Extract) ===
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, X, AlertTriangle } from 'lucide-react';
import { MerchItem } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { id: string; quantity: number }[];
  merchandiseList: MerchItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  merchandiseList,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Aggregate item data mapping
  const activeItems = cartItems.map(item => {
    const detail = merchandiseList.find(m => m.id === item.id);
    return {
      ...item,
      detail
    };
  }).filter((item): item is { id: string; quantity: number; detail: MerchItem } => !!item.detail);

  // Compute values
  const totalQty = activeItems.reduce((acc, val) => acc + val.quantity, 0);
  const totalPriceTwd = activeItems.reduce((acc, val) => acc + (val.detail.priceTwd * val.quantity), 0);
  const totalPriceUsd = activeItems.reduce((acc, val) => acc + (val.detail.priceUsd * val.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex justify-end">
          
          {/* Backdrop screen mask */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Sidebar card wrapper */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="w-full max-w-md bg-amber-50 h-full relative z-10 shadow-2xl flex flex-col justify-between border-l border-purple-200"
          >
            
            {/* Header block */}
            <div className="p-6 border-b border-purple-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                <span className="font-extrabold text-purple-950 text-base font-display">
                  已加應援周邊備忘 ({totalQty})
                </span>
              </div>
              
              <button 
                type="button" 
                onClick={onClose}
                className="p-1.5 hover:bg-purple-100 text-purple-950 rounded-full cursor-pointer transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeItems.length > 0 ? (
                <>
                  <div className="flex justify-between items-center bg-purple-100/35 border border-purple-200/50 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-purple-700">想多加周邊/玩偶？直接加進來吧！</span>
                    <button 
                      type="button"
                      onClick={onClearCart}
                      className="text-[10px] font-extrabold text-pink-500 hover:text-pink-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>清空備忘</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {activeItems.map((item, idx) => (
                      <div 
                        key={item.id + idx}
                        className="bg-white border border-purple-100 rounded-2xl p-4 flex gap-4 items-center justify-between shadow-3xs"
                      >
                        <div className="text-3xl select-none select-none shrink-0 p-1 bg-purple-50 rounded-xl">
                          {item.detail.emoji}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="font-extrabold text-xs text-purple-950 truncate">
                            {item.detail.nameZh}
                          </h4>
                          <span className="text-[10px] text-purple-500 font-bold block mt-0.5">
                            單價 NT$ {item.detail.priceTwd.toLocaleString()}
                          </span>
                        </div>

                        {/* Adjust qty panel */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-1 text-purple-950 bg-purple-100/50 hover:bg-purple-200/80 rounded-lg cursor-pointer transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <span className="text-xs font-black text-purple-950 w-4.5 text-center font-mono">
                            {item.quantity}
                          </span>

                          <button 
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-1 text-purple-950 bg-purple-100/50 hover:bg-purple-200/80 rounded-lg cursor-pointer transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-32" style={{ height: '12px' }} />
                          </button>

                          <button 
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 hover:bg-pink-100 text-pink-500 rounded-lg cursor-pointer ml-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center p-6 text-purple-400">
                  <span className="text-5xl select-none animate-bounce mb-4">🍭</span>
                  <span className="text-sm font-extrabold text-purple-950">應援備忘清單尚空！</span>
                  <span className="text-[11px] text-purple-500 mt-1 font-medium leading-relaxed max-w-xs">
                    快滑到下方周邊版塊，將經典三代 CANDYBONG、專輯、帽T or 成員玩偶點擊加進清單！
                  </span>
                </div>
              )}
            </div>

            {/* Bottom aggregate section panel */}
            {activeItems.length > 0 && (
              <div className="p-6 bg-white border-t border-purple-100 space-y-4">
                <div className="space-y-1.5 border-b border-purple-100/50 pb-4">
                  <div className="flex justify-between text-xs text-purple-500 font-bold">
                    <span>商品項數 Items Total:</span>
                    <span className="font-mono">{totalQty} 件</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-purple-950 font-black">預計應援合計 Estimate Total:</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-purple-950 block leading-none font-display">
                        NT$ {totalPriceTwd.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-purple-400 font-extrabold block mt-1">
                        USD ${totalPriceUsd.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-100/35 border border-amber-200/50 p-3 rounded-xl flex gap-2 items-start text-[11px] text-amber-800 leading-normal">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="font-semibold">
                    此功能僅為「應援備忘清單」方便試算。請點擊「JYP Shop」官方按鈕以前往外部商場進行確切結帳付款！
                  </span>
                </div>

                <a 
                  href="https://thejypshop.com/category/twice/324/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-center py-4 rounded-2xl font-black text-xs tracking-wider transition-all duration-300 transform hover:scale-101 shadow-lg shadow-purple-200 flex items-center justify-center gap-2 select-none cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  前往 JYP Shop 官方商場 checkout ➡️
                </a>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}



=== FILE: Discography.tsx (Local Source Extract) ===
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



=== FILE: Footer.tsx (Local Source Extract) ===
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



=== FILE: Hero.tsx (Local Source Extract) ===
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Music } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-[90vh] pt-32 pb-20 overflow-hidden bg-gradient-to-b from-purple-100 to-amber-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(153,102,204,0.18)_0%,_rgba(255,204,102,0.1)_40%,_transparent_70%)] pointer-events-none" />
      
      {/* Floating Animated Background Ornaments */}
      <div className="absolute top-[20%] left-[8%] opacity-30 pointer-events-none animate-float hidden md:block">
        <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
      </div>
      <div className="absolute bottom-[25%] right-[10%] opacity-20 pointer-events-none animate-float hidden md:block" style={{ animationDelay: '2.5s' }}>
        <Heart className="w-10 h-10 text-pink-500 fill-pink-500/25" />
      </div>
      <div className="absolute top-[40%] right-[12%] opacity-25 pointer-events-none animate-float hidden md:block" style={{ animationDelay: '4s' }}>
        <Music className="w-6 h-6 text-amber-500 animate-bounce" />
      </div>

      <div className="absolute top-28 left-[15%] w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-amber-300 opacity-20 blur-md animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-32 left-[10%] w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-300 via-pink-400 to-purple-600 opacity-15 blur-xs animate-float pointer-events-none" style={{ animationDelay: '1s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto flex flex-col items-center z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-purple-600 font-extrabold text-xs sm:text-sm tracking-[10px] uppercase mb-4 pl-[10px] flex items-center gap-1.5"
        >
          <span className="notranslate" translate="no">JYP ENTERTAINMENT PRESENTS</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="shimmer-text text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none uppercase select-none drop-shadow-xs font-display notranslate"
          translate="no"
        >
          TWICE
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, scale: 0.98, y: 5 }}
          animate={{ 
            opacity: [0.8, 1, 0.8],
            scale: [0.98, 1, 0.98],
            y: [0, -3, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          className="text-lg sm:text-2xl text-purple-950 font-black mt-6 tracking-[8px] sm:tracking-[12px] uppercase select-none translate-x-[4px] pl-[4px] notranslate"
          translate="no"
        >
          ONE IN A MILLION
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 justify-center items-center"
        >
          <a 
            href="#members" 
            className="bg-gradient-to-r from-[#8B1FFF] to-[#ED299F] hover:from-[#7B1EE6] hover:to-[#DD228F] text-white px-10 py-4 rounded-full font-black text-sm tracking-[2px] uppercase transition-all duration-300 shadow-lg shadow-purple-300/50 hover:shadow-purple-400/60 transform hover:-translate-y-1"
          >
            探索成員 PROFILES
          </a>
          <a 
            href="#merchandise" 
            className="bg-[#FFF5D6]/95 hover:bg-[#FFF2C2] text-purple-950 border border-[#FFF0C2] hover:border-[#FFDEB3] px-10 py-4 rounded-full font-black text-sm tracking-[2px] uppercase transition-all duration-300 shadow-md shadow-amber-200/50 transform hover:-translate-y-1"
          >
            周邊商品 OFFICIAL SHOP
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-amber-50" />
    </section>
  );
}



=== FILE: MemberGame.tsx (Local Source Extract) ===
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Star, 
  Info, 
  Award,
  HelpCircle,
  HelpCircle as QuestionIcon,
  Check,
  X as CloseIcon,
  Sparkles,
  BookOpen,
  MapPin,
  Calendar,
  Ruler,
  Droplet,
  User,
  Heart
} from 'lucide-react';
import { members, Member } from '../data';

interface Question {
  type: 'emoji_role' | 'mbti_origin' | 'birth_height' | 'bio_snippet' | 'silhouette';
  clues: string[];
  options: Member[];
  correctAnswer: Member;
  bioSentenceUsed?: string;
}

// Safe LocalStorage helper guarding against iFrame Sandbox / Third-Party Security restrictions
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // safe no-op inside restricted sandboxes
    }
  }
};

export default function MemberGame() {
  // Scoreboard state with LocalStorage persistence
  const [cumulativeScore, setCumulativeScore] = useState<number>(() => {
    const saved = safeStorage.getItem('twice_game_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [streak, setStreak] = useState<number>(() => {
    const saved = safeStorage.getItem('twice_game_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [highestStreak, setHighestStreak] = useState<number>(() => {
    const saved = safeStorage.getItem('twice_game_highest_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [gamesPlayed, setGamesPlayed] = useState<number>(() => {
    const saved = safeStorage.getItem('twice_games_played');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Game flow states
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'round_end'>('welcome');
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [roundScore, setRoundScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [hintsUsed, setHintsUsed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [blurLevel, setBlurLevel] = useState<number>(20); // for silhouette mode
  
  // Custom toast notifications for achievements
  const [achievementToast, setAchievementToast] = useState<string | null>(null);

  // Sync state helpers to localStorage
  useEffect(() => {
    safeStorage.setItem('twice_game_score', cumulativeScore.toString());
  }, [cumulativeScore]);

  useEffect(() => {
    safeStorage.setItem('twice_game_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    safeStorage.setItem('twice_game_highest_streak', highestStreak.toString());
  }, [highestStreak]);

  useEffect(() => {
    safeStorage.setItem('twice_games_played', gamesPlayed.toString());
  }, [gamesPlayed]);

  // Audio synthesizer utilizing the Web Audio API
  const playSound = (type: 'correct' | 'wrong' | 'click' | 'victory' | 'medal') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.frequency.linearRampToValueAtTime(95, ctx.currentTime + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'victory') {
        const playTone = (freq: number, start: number, dur: number) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, ctx.currentTime + start);
          g.gain.setValueAtTime(0.06, ctx.currentTime + start);
          o.start(ctx.currentTime + start);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
          o.stop(ctx.currentTime + start + dur);
        };
        playTone(329.63, 0, 0.4); // E4
        playTone(392.00, 0.1, 0.4); // G4
        playTone(523.25, 0.2, 0.4); // C5
        playTone(659.25, 0.3, 0.8); // E5
      } else if (type === 'medal') {
        const playTone = (freq: number, start: number, dur: number) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, ctx.currentTime + start);
          g.gain.setValueAtTime(0.05, ctx.currentTime + start);
          o.start(ctx.currentTime + start);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
          o.stop(ctx.currentTime + start + dur);
        };
        playTone(440.00, 0, 0.15); // A4
        playTone(554.37, 0.12, 0.15); // C#5
        playTone(659.25, 0.24, 0.15); // E5
        playTone(880.00, 0.36, 0.6); // A5
      }
    } catch (e) {
      // safe fallback if audio APIs are blocked by browser interaction restrictions
    }
  };

  // Build a randomized question with deep insights of members
  const generateQuestion = (): Question => {
    // Pick a correct member
    const correctIdx = Math.floor(Math.random() * members.length);
    const correctMember = members[correctIdx];

    // Pick 3 distractor options
    const optionsPool = members.filter(m => m.nameEn !== correctMember.nameEn);
    const scrambledPool = [...optionsPool].sort(() => 0.5 - Math.random());
    const distractors = scrambledPool.slice(0, 3);
    const finalOptions = [correctMember, ...distractors].sort(() => 0.5 - Math.random());

    // Choose round quiz sub-type: only photo guessing/silhouette now
    const chosenType: Question['type'] = 'silhouette';

    const clues: string[] = [];
    const bioSentenceUsed = '';

    clues.push("【美照認臉挑戰】請認真觀察下方這張精緻的團員美照，猜猜她是哪位成員？");
    clues.push(`擔當職責定位：「${correctMember.role}」`);
    clues.push(`代表可愛 Emoji：「${correctMember.emoji}」 · 出身地：「${correctMember.country}」`);

    return {
      type: chosenType,
      clues,
      options: finalOptions,
      correctAnswer: correctMember,
      bioSentenceUsed
    };
  };

  const startNewTriviaGame = () => {
    playSound('click');
    setGameState('playing');
    setCurrentRoundIndex(1);
    setRoundScore(0);
    setCorrectCount(0);
    setAnswerSelected(false);
    setSelectedMember(null);
    setHintsUsed(false);
    setBlurLevel(24);
    setCurrentQuestion(generateQuestion());
  };

  const selectAnswerOption = (option: Member) => {
    if (answerSelected) return;
    
    setAnswerSelected(true);
    setSelectedMember(option);
    
    const isCorrect = option.nameEn === currentQuestion?.correctAnswer.nameEn;
    if (isCorrect) {
      playSound('correct');
      setCorrectCount(prev => prev + 1);
      const earned = hintsUsed ? 5 : 10;
      setRoundScore(prev => prev + earned);
      setCumulativeScore(prev => prev + earned);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak);
        safeStorage.setItem('twice_game_highest_streak', newStreak.toString());
        
        // Show unlocked achievement milestone
        if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
          triggerToast(`🏆 解鎖成就：連勝紀錄達到 ${newStreak} 次！`);
        }
      }
    } else {
      playSound('wrong');
      setStreak(0);
    }
  };

  const triggerToast = (msg: string) => {
    setAchievementToast(msg);
    playSound('medal');
    setTimeout(() => {
      setAchievementToast(null);
    }, 4500);
  };

  const revealMoreHints = () => {
    playSound('click');
    setHintsUsed(true);
    if (currentQuestion?.type === 'silhouette') {
      setBlurLevel(8); // reduce blur significantly
    }
  };

  const advanceNextQuestion = () => {
    playSound('click');
    if (currentRoundIndex < 5) {
      setCurrentRoundIndex(prev => prev + 1);
      setAnswerSelected(false);
      setSelectedMember(null);
      setHintsUsed(false);
      setBlurLevel(24);
      setCurrentQuestion(generateQuestion());
    } else {
      // End of this game round
      setGamesPlayed(prev => prev + 1);
      setGameState('round_end');
      playSound('victory');
    }
  };

  const resetAllGameData = () => {
    if (confirm("ONCE，您確定要重設您目前累積的所有分數與連勝數回到 0 嗎？這項動作無法還原喔！")) {
      playSound('click');
      setCumulativeScore(0);
      setStreak(0);
      setHighestStreak(0);
      setGamesPlayed(0);
      setGameState('welcome');
      triggerToast("🧹 分數與連勝紀錄已全數清理完畢！");
    }
  };

  const getRankBadgeAndTitle = (points: number) => {
    if (points >= 300) {
      return { 
        title: "🌌 宇宙耀眼傳奇 ONCE 首長", 
        style: "bg-linear-to-r from-purple-600 via-pink-500 to-amber-400 text-white shadow-lg",
        icon: "👑"
      };
    } else if (points >= 150) {
      return { 
        title: "💎 殿堂大師級 專業 ONCE", 
        style: "bg-gradient-to-r from-purple-700 to-pink-500 text-white",
        icon: "🏆"
      };
    } else if (points >= 60) {
      return { 
        title: "🌟 狂熱資深 ONCE 大戶", 
        style: "bg-purple-100 text-purple-800 border border-purple-300",
        icon: "🛡️"
      };
    } else if (points >= 10) {
      return { 
        title: "🌸 初升 ONCE 新星學員", 
        style: "bg-amber-100 text-amber-900 border border-amber-300",
        icon: "🍭"
      };
    } else {
      return { 
        title: "🐣 萌新 ONCE 練習生", 
        style: "bg-slate-100 text-slate-500 border border-slate-300",
        icon: "🥚"
      };
    }
  };

  const currentRank = getRankBadgeAndTitle(cumulativeScore);

  return (
    <section id="game" className="scroll-mt-24 px-6 py-20 bg-gradient-to-b from-[#f4f0fa] to-[#fcf6e8] border-t-2 border-b-2 border-purple-200 relative overflow-hidden">
      {/* Decorative Background Glowing Elements */}
      <div className="absolute top-[10%] left-[-5%] w-72 h-72 rounded-full bg-linear-to-tr from-purple-300/20 to-pink-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-72 h-72 rounded-full bg-linear-to-tr from-yellow-100/30 to-purple-200/20 blur-3xl pointer-events-none" />

      {/* Floating Animated Toast Banner */}
      <AnimatePresence>
        {achievementToast && (
          <motion.div 
            initial={{ opacity: 0, y: -80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-100 bg-purple-950 text-white px-6 py-4 rounded-2xl shadow-xl border-2 border-pink-400 flex items-center gap-3 max-w-sm w-full mx-4"
          >
            <span className="text-3xl animate-bounce">🎁</span>
            <div>
              <h4 className="text-xs font-black tracking-widest text-pink-300 uppercase">Achievement!</h4>
              <p className="text-xs font-bold text-amber-100 mt-0.5">{achievementToast}</p>
            </div>
            <button 
              onClick={() => setAchievementToast(null)}
              className="ml-auto text-purple-300 hover:text-white p-1"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Game Title Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600/10 to-pink-500/10 border-2 border-purple-300/50 text-purple-800 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>TWICE ONCE INTERACTIVE STATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-purple-950 tracking-tight font-display">
            成員認識大PK · 趣玩<span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 underline decoration-wavy decoration-yellow-400 pl-1.5 pr-1.5">猜猜樂</span> 🎮
          </h2>
          <p className="text-purple-700 font-medium text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
            您是位見證一切的「真粉 ONCE」嗎？來挑戰動態隨機題庫，透過 Emoji 、出身地、MBTI、隱藏日誌與面容剪影等重重提示，找出最正確的成員並解鎖高階勳章吧！
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white/75 backdrop-blur-md border border-purple-100 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentRank.icon}</span>
            <div>
              <span className="text-[10px] text-purple-400 font-black tracking-wider block uppercase">ONCE 認證銜級</span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg inline-block mt-0.5 ${currentRank.style}`}>
                {currentRank.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-purple-950">
            <div className="text-center bg-purple-50/50 border border-purple-100 px-3 py-1.5 rounded-xl">
              <span className="text-purple-400 block text-[9px] uppercase tracking-wider">目前累積總分</span>
              <span className="text-sm font-black text-purple-700 font-mono">{cumulativeScore}</span>
            </div>
            <div className="text-center bg-pink-50/50 border border-pink-100 px-3 py-1.5 rounded-xl">
              <span className="text-pink-400 block text-[9px] uppercase tracking-wider">當前連勝頭銜</span>
              <span className="text-sm font-black text-pink-600 font-mono">🔥 {streak} 🔥</span>
            </div>
            <div className="text-center bg-amber-50/50 border border-amber-100 px-3 py-1.5 rounded-xl hidden sm:block">
              <span className="text-amber-500 block text-[9px] uppercase tracking-wider">最高連勝歷史</span>
              <span className="text-sm font-black text-amber-700 font-mono">🏆 {highestStreak}</span>
            </div>

            <button 
              onClick={() => { playSound('click'); setSoundEnabled(!soundEnabled); }}
              className="p-2.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-full transition-all cursor-pointer shadow-3xs"
              title={soundEnabled ? "開關音效 (目前: 開啟)" : "開關音效 (目前: 關閉)"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Game Stage Container Container */}
        <div className="bg-white/90 border-2 border-purple-200 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: WELCOME */}
            {gameState === 'welcome' && (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center py-8 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-purple-100 text-purple-700 border-2 border-purple-300 rounded-full flex items-center justify-center text-4xl mb-6 shadow-md shadow-purple-200">
                  🧬
                </div>
                
                <h3 className="text-2xl font-black text-purple-950 mb-3">準備好開始挑戰自我了嗎？</h3>
                <p className="text-xs text-purple-600/90 max-w-md mx-auto leading-relaxed mb-8">
                  每次挑戰共有 <strong className="text-purple-900">5 題隨機成員測驗</strong>。答對一題可得 <strong className="text-purple-900">10 分</strong>，如果您在中途使用了「提示功能」，答對則可得 <strong className="text-amber-600">5 分</strong>。讓我們一起刷新連勝榜，證明您是真正的 ONCE ！
                </p>

                {gamesPlayed > 0 && (
                  <div className="grid grid-cols-2 gap-4 max-w-sm w-full mb-8 bg-slate-50 border border-purple-100/60 rounded-2xl p-4.5 text-xs text-purple-900 font-bold">
                    <div className="text-left border-r border-purple-200/50 pr-2">
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">已完成測驗場數</span>
                      <span className="text-sm font-black text-purple-950 font-mono mt-0.5 block">{gamesPlayed} 次挑戰</span>
                    </div>
                    <div className="text-left pl-2">
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">最高連勝記錄</span>
                      <span className="text-sm font-black text-pink-600 font-mono mt-0.5 block">🔥 {highestStreak} 連勝</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={startNewTriviaGame}
                    className="bg-gradient-to-r from-purple-600 to-[#ff66cc] hover:from-purple-700 hover:to-[#ff4da6] text-white px-10 py-4 rounded-full font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-purple-200 hover:shadow-purple-300/70 transform hover:-translate-y-1 cursor-pointer"
                  >
                    🚀 開始成員猜猜樂 Start Game
                  </button>

                  {cumulativeScore > 0 && (
                    <button 
                      onClick={resetAllGameData}
                      className="text-purple-400 hover:text-purple-800 hover:bg-purple-100/30 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      🧹 重設我的積分 Reset Scores
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: PLAYING QUESTION */}
            {gameState === 'playing' && currentQuestion && (
              <motion.div 
                key="playing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                {/* Round Progress Indicator */}
                <div className="flex justify-between items-center pb-4 border-b border-purple-100 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center font-mono">
                      {currentRoundIndex}
                    </span>
                    <span className="text-xs font-black text-purple-950">進度第 {currentRoundIndex} / 5 題</span>
                  </div>
                  <div className="text-xs font-extrabold text-amber-700">
                    本場回合得分：<span className="font-mono text-sm font-black text-purple-700">{roundScore}分</span>
                  </div>
                </div>

                {/* Main Question Display Zone */}
                <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/20 border border-purple-100/60 rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
                  
                  {/* Silhouette specific slot */}
                  {currentQuestion.type === 'silhouette' && (
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md relative bg-slate-100">
                        {currentQuestion.correctAnswer.imageUrl ? (
                          <img 
                            src={currentQuestion.correctAnswer.imageUrl} 
                            alt="Who is this?"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover select-none pointer-events-none transition-all duration-550 ease-out"
                            style={{ 
                              filter: answerSelected ? 'none' : `blur(${blurLevel}px) brightness(0.25) contrast(1.4)`,
                              transform: answerSelected ? 'scale(1)' : 'scale(1.05)'
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl font-black bg-purple-50">
                            ❓
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-purple-500 font-bold block bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/20 mt-1.5 shadow-3xs uppercase">
                        {answerSelected ? "完美揭秘！" : "📸 超清晰認臉挑戰"}
                      </span>
                    </div>
                  )}

                  {/* Icon indicator based on question styles */}
                  {currentQuestion.type !== 'silhouette' && (
                    <div className="text-4xl select-none mb-4 animate-bounce">
                      {currentQuestion.type === 'emoji_role' ? '🎨' : currentQuestion.type === 'mbti_origin' ? '🗳️' : currentQuestion.type === 'birth_height' ? '🎂' : '📚'}
                    </div>
                  )}

                  <h4 className="text-xs font-black tracking-widest text-purple-500 uppercase mb-3 pl-1">
                    {currentQuestion.type === 'emoji_role' && "🌟 EMOJI 及特色線索推薦"}
                    {currentQuestion.type === 'mbti_origin' && "🔬 MBTI與出身履歷探針"}
                    {currentQuestion.type === 'birth_height' && "📏 美麗身高生日探查針"}
                    {currentQuestion.type === 'bio_snippet' && "📕 隱藏自傳文字段落猜猜看"}
                    {currentQuestion.type === 'silhouette' && "🧩 面部容顏大考驗"}
                  </h4>

                  {/* Clues elements list */}
                  <div className="space-y-2 mt-4 max-w-xl mx-auto">
                    {currentQuestion.clues.map((clue, ci) => {
                      // Hide 2nd and 3rd clues if hints not used
                      const isSecret = ci > 0 && !hintsUsed && !answerSelected;
                      return (
                        <div 
                          key={ci}
                          className={`text-sm tracking-wide p-3 rounded-xl border transition-all duration-300 flex items-center justify-center ${isSecret ? 'bg-purple-100/30 border-dashed border-purple-200/50 text-purple-300' : 'bg-white border-purple-100 text-purple-950 font-bold'}`}
                        >
                          {isSecret ? (
                            <span className="flex items-center gap-1.5 leading-none">
                              <HelpCircle className="w-3.5 h-3.5 opacity-60" />
                              線索 #{ci + 1} 已封鎖 (請點下方提示鍵解鎖)
                            </span>
                          ) : (
                            <span className="leading-relaxed">{clue}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Helpful hints trigger button */}
                  {!answerSelected && !hintsUsed && (
                    <button 
                      onClick={revealMoreHints}
                      className="mt-5 text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 px-4 py-1.5 rounded-xl hover:bg-amber-200/80 transition-all cursor-pointer shadow-3xs flex items-center gap-1 mx-auto"
                    >
                      <Info className="w-3 h-3 text-amber-700" />
                      <span>解鎖額外提示 (本題解答點分改為 5 分)</span>
                    </button>
                  )}
                </div>

                {/* 4 Multi-Choice Option Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {currentQuestion.options.map((option, oi) => {
                    // Check button statuses after submitted
                    const isSelected = selectedMember?.nameEn === option.nameEn;
                    const isCorrect = option.nameEn === currentQuestion.correctAnswer.nameEn;
                    
                    let buttonStyle = 'bg-white hover:bg-purple-50 hover:border-purple-400 border-purple-200 text-purple-950';
                    let iconNode = <span className="text-purple-300 font-mono text-[10px] w-5 h-5 rounded-full border border-purple-200 flex items-center justify-center shrink-0">{oi + 1}</span>;

                    if (answerSelected) {
                      if (isCorrect) {
                        buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black shadow-md shadow-emerald-100';
                        iconNode = <span className="bg-emerald-500 text-white p-0.5 rounded-full shrink-0"><Check className="w-3.5 h-3.5" /></span>;
                      } else if (isSelected) {
                        buttonStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-black shadow-md shadow-rose-100';
                        iconNode = <span className="bg-rose-500 text-white p-0.5 rounded-full shrink-0"><CloseIcon className="w-3.5 h-3.5" /></span>;
                      } else {
                        buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={option.nameEn + oi}
                        onClick={() => selectAnswerOption(option)}
                        disabled={answerSelected}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center justify-between cursor-pointer ${buttonStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl select-none">{option.emoji}</span>
                          <div>
                            <span className="text-sm font-black block">{option.name}</span>
                            <span className="text-[9px] uppercase tracking-wider block opacity-75">{option.nameEn}</span>
                          </div>
                        </div>
                        {iconNode}
                      </button>
                    );
                  })}
                </div>

                {/* FEEDBACK EXPOSITION REVEAL CARD */}
                <AnimatePresence>
                  {answerSelected && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-2 border-purple-300 bg-linear-to-b from-[#faf5ff] to-white rounded-2xl p-5 mb-8 relative"
                    >
                      {/* Close detail card icon */}
                      <span className="absolute top-3.5 right-4 text-xs font-black tracking-widest text-purple-400 uppercase font-mono">
                        ANALYTICS CARD
                      </span>

                      {/* Header comments */}
                      <div className="flex items-center gap-2 mb-4">
                        {selectedMember?.nameEn === currentQuestion.correctAnswer.nameEn ? (
                          <>
                            <span className="text-xl">🏆</span>
                            <h5 className="text-sm font-black text-emerald-600">答對了！恭喜 ONCE 眼力超群 💖</h5>
                          </>
                        ) : (
                          <>
                            <span className="text-xl">💔</span>
                            <h5 className="text-sm font-black text-rose-500">
                              猜錯囉，正確答案是「{currentQuestion.correctAnswer.name}」！
                            </h5>
                          </>
                        )}
                      </div>

                      {/* Correct Member Profile Reveal Card for study */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-purple-100/60">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 shrink-0 bg-slate-50 shadow-sm">
                          {currentQuestion.correctAnswer.imageUrl ? (
                            <img 
                              src={currentQuestion.correctAnswer.imageUrl} 
                              alt={currentQuestion.correctAnswer.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-black">
                              {currentQuestion.correctAnswer.emoji}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <h6 className="text-lg font-black text-purple-950 leading-none">
                            {currentQuestion.correctAnswer.name} ({currentQuestion.correctAnswer.nameEn})
                          </h6>
                          <p className="text-[11px] font-bold text-purple-500 mt-1 uppercase tracking-wider">
                            定位：{currentQuestion.correctAnswer.role} · 出身地區：{currentQuestion.correctAnswer.country}
                          </p>
                          <p className="text-xs text-purple-900 mt-3 leading-relaxed font-semibold">
                            {currentQuestion.correctAnswer.bio}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center flex-wrap gap-4">
                        <div className="bg-purple-100/50 border border-purple-200/50 px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-purple-950">
                          🧩 MBTI: {currentQuestion.correctAnswer.mbti} · 身高: {currentQuestion.correctAnswer.height} · 血型: {currentQuestion.correctAnswer.bloodType}
                        </div>
                        <button 
                          onClick={advanceNextQuestion}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm transform hover:scale-103"
                        >
                          {currentRoundIndex < 5 ? "解鎖下一題 Next Question →" : "查看終場結算 Report ✨"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}

            {/* SCREEN 3: ROUND SUMMARY & CERTIFICATE */}
            {gameState === 'round_end' && (
              <motion.div 
                key="round_end"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-[#ff66cc] text-white p-5 rounded-full flex items-center justify-center shadow-lg relative mb-6">
                  <Trophy className="w-12 h-12 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-purple-600 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                    5
                  </div>
                </div>

                <span className="text-[10px] font-black tracking-[4px] text-purple-500 block uppercase mb-1">
                  ROUND PERFORMANCE CERTIFICATE
                </span>
                <h3 className="text-2xl font-black text-purple-950 mb-2">本次成員評估已完美出爐！</h3>
                
                {/* Score and percentage cards */}
                <div className="bg-purple-50/50 border-2 border-dashed border-purple-200 p-6 rounded-2xl max-w-md w-full my-6 text-purple-950 relative">
                  <span className="absolute -top-3 left-4 bg-purple-200 text-purple-800 text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase border border-purple-300">
                    統計速覽 STATS
                  </span>
                  
                  <div className="grid grid-cols-3 gap-3 font-bold text-center">
                    <div>
                      <span className="text-slate-400 text-[9px] block uppercase tracking-wider">回合累計積分</span>
                      <span className="text-lg font-black text-purple-950 font-mono">{roundScore}分</span>
                    </div>
                    <div className="border-l border-r border-purple-200 px-2">
                      <span className="text-slate-400 text-[9px] block uppercase tracking-wider">答對題數</span>
                      <span className="text-lg font-black text-emerald-600 font-mono">
                        {correctCount} / 5 題
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] block uppercase tracking-wider">當前連勝狀態</span>
                      <span className="text-lg font-black text-pink-600 font-mono">🔥 {streak} 連勝</span>
                    </div>
                  </div>

                  <div className="border-t border-purple-200/50 mt-4 pt-4 text-xs font-bold flex flex-col items-center">
                    <span className="text-slate-400 text-[9px] block uppercase tracking-wider mb-1.5">ONCE 稱號鑑定</span>
                    
                    {roundScore === 50 ? (
                      <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 py-2 px-4 rounded-xl">
                        👑 <strong>黃金九人心心相印神級 ONCE 🎖️</strong><br/>
                        太神奇了！十分完美的測驗結果，代表妳對全體成員熟稔至極，絕對是萬中選一的護航大師！
                      </div>
                    ) : roundScore >= 35 ? (
                      <div className="text-purple-800 bg-purple-50 border border-purple-200 py-2 px-4 rounded-xl">
                        🌟 <strong>資深鐵粉 ONCE 達人 🌸</strong><br/>
                        表現非常優異！對於成員們的性格特點與出身都十分清晰，是名副其實、愛意滿滿的優秀 ONCE！
                      </div>
                    ) : roundScore >= 20 ? (
                      <div className="text-amber-800 bg-amber-50 border border-amber-300 py-2 px-4 rounded-xl">
                        🐥 <strong>熱情 ONCE 新星 🍭</strong><br/>
                        完成得很好！可以稍微對比閱讀上方的成員名錄，深入挖掘姑娘們的獨家履歷，挑戰滿分就指日可待！
                      </div>
                    ) : (
                      <div className="text-slate-600 bg-slate-50 border border-slate-200 py-2 px-4 rounded-xl">
                        🌱 <strong>極富潛力 ONCE 萌新學員 🐣</strong><br/>
                        沒關係！這是一個絕佳的起步，您可以點選下方的「成員資訊速查表」好好溫習，九位明星的光芒等著您探索！
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={startNewTriviaGame}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-8 py-3.5 rounded-full tracking-widest uppercase transition-all duration-300 shadow-md shadow-purple-200 transform hover:-translate-y-1 cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>再玩一回合 Play Again</span>
                  </button>
                  <button 
                    onClick={() => { playSound('click'); setGameState('welcome'); }}
                    className="border-2 border-purple-300 text-purple-950 font-black text-xs px-8 py-3.5 rounded-full hover:bg-purple-100/30 transition-all cursor-pointer"
                  >
                    🏠 關閉測驗，回到大廳
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* STUDY BOOKLET HELPER */}
        <div className="mt-12 bg-white/70 backdrop-blur-md rounded-2xl border border-purple-100 p-6 shadow-md text-purple-950">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-purple-100">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h4 className="font-extrabold text-sm tracking-tight text-purple-950">
              💡 認識 TWICE 成員速成手冊 · 學好再戰！
            </h4>
          </div>

          <p className="text-xs text-purple-900/80 leading-relaxed font-semibold mb-6">
            想快速拿高分？這裡有九位女孩的特徵與代表色小筆記：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {members.map(m => (
              <div 
                key={m.nameEn} 
                className="bg-white border border-purple-100/50 rounded-xl p-3 flex items-center gap-2.5 shadow-2xs hover:border-purple-300 transition-colors"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 font-black"
                  style={{ backgroundColor: `${m.color}15`, border: `2px solid ${m.color}40`, color: m.color }}
                >
                  {m.emoji}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-purple-950">{m.name}</span>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 truncate">{m.nameEn}</span>
                  </div>
                  <div className="text-[9px] text-purple-500 font-bold tracking-tight truncate mt-0.5">
                    {m.role.split(" · ")[0]} · {m.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}



=== FILE: Members.tsx (Local Source Extract) ===
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Calendar, Ruler, Droplet, User, X } from 'lucide-react';
import { members, Member } from '../data';

interface MemberModalProps {
  member: Member | null;
  onClose: () => void;
}

export function MemberModal({ member, onClose }: MemberModalProps) {
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [member]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window content card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-gradient-to-br from-[#faf5ff] to-[#fffbfc] rounded-3xl border-2 w-full max-w-lg shadow-2xl relative overflow-hidden z-10 max-h-[85vh] flex flex-col"
          style={{ 
            borderColor: member.color,
            boxShadow: `0 20px 40px -15px ${member.color}60` 
          }}
        >
          {/* Top color ribbon accent */}
          <div className="h-2 w-full" style={{ backgroundColor: member.color }} />

          {/* Close trigger button icon */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-purple-950 rounded-full hover:rotate-90 transition-all duration-300 cursor-pointer shadow-xs border border-purple-100 z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrolling profile sheet contents */}
          <div className="overflow-y-auto p-6 md:p-8 flex-1">
            <div className="flex flex-col items-center text-center pb-6 border-b border-purple-100">
              <div 
                className="w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 relative overflow-hidden bg-slate-50"
                style={{ 
                  borderColor: member.color || '#9966cc',
                  boxShadow: `0 8px 16px -4px ${member.color}40` 
                }}
              >
                {member.imageUrl ? (
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <div 
                  className="absolute inset-0 flex items-center justify-center text-5xl select-none"
                  style={{ 
                    backgroundColor: member.imageUrl ? 'transparent' : `${member.color}22`,
                    zIndex: member.imageUrl ? -1 : 1
                  }}
                >
                  {member.emoji}
                </div>
              </div>
              
              <h2 className="text-3xl font-black text-purple-950 mt-4 leading-none font-display">
                {member.name}
              </h2>
              <div className="text-[11px] font-bold tracking-[3px] text-purple-500 uppercase mt-2 font-mono">
                {member.nameEn}
              </div>
            </div>

            {/* Quick Badges table */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-600" />
                  <span>擔當 Role</span>
                </span>
                <span className="text-xs font-extrabold text-purple-950">
                  {member.role}
                </span>
              </div>
              <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3.5 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>出身地 Origin</span>
                </span>
                <span className="text-xs font-extrabold text-purple-950">
                  {member.country}
                </span>
              </div>
            </div>

            {/* Detailed Metadata fields */}
            <div className="bg-slate-50 border border-purple-100/50 rounded-2xl p-4 text-[13px] text-purple-900 mb-6 space-y-2.5">
              <div className="flex justify-between py-1 border-b border-purple-100/30">
                <span className="font-semibold text-purple-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 opacity-60" /> 生日 Birthdate:
                </span>
                <span className="font-bold text-purple-950">{member.birthdate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-purple-100/30">
                <span className="font-semibold text-purple-500 flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 opacity-60" /> 身高 Height:
                </span>
                <span className="font-bold text-purple-950">{member.height}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-purple-100/30">
                <span className="font-semibold text-purple-500 flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 opacity-60" /> 血型 Blood Type:
                </span>
                <span className="font-bold text-purple-950">{member.bloodType}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-purple-500 flex items-center gap-1">
                  🧬 MBTI:
                </span>
                <span 
                  className="font-extrabold px-2.5 py-0.5 rounded-lg text-xs text-white"
                  style={{ backgroundColor: member.color || '#9966cc' }}
                >
                  {member.mbti}
                </span>
              </div>
            </div>

            {/* Paragraph Biography */}
            <div className="bg-purple-100/30 border border-purple-200/50 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
                <Sparkles className="w-12 h-12 text-purple-600" />
              </div>
              <h4 className="text-[11px] font-black tracking-widest text-purple-800 uppercase mb-2">
                成員自傳 Biography
              </h4>
              <p className="text-[13px] leading-relaxed text-purple-950 font-medium">
                {member.bio}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function Members() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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
    <section id="members" className="scroll-mt-24 px-6 py-20 max-w-7xl mx-auto">
      {/* Heading Block */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>ONCE & TWICE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-purple-950 tracking-tight font-display">
          九位閃耀的<span className="text-purple-600 drop-shadow-3xs px-1.5 underline decoration-wavy decoration-pink-400">明星</span> ✨
        </h2>
        <p className="text-purple-700 font-medium text-sm max-w-lg mx-auto mt-4 leading-relaxed">
          九人九色，每一位都擁有獨一無二的光芒，匯聚在一起便是照亮宇宙的璀璨星辰。點擊展開深度檔案秘史！
        </p>
      </div>

      {/* Grid List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center"
      >
        {members.map(member => (
          <motion.div
            key={member.nameEn}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedMember(member)}
            className="group cursor-pointer rounded-2xl p-6 text-center border-2 border-purple-200 bg-white/80 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            style={{ boxShadow: '0 4px 20px -2px rgba(153, 102, 204, 0.05)' }}
          >
            {/* Hover dynamic gradient background aura */}
            <div 
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md scale-103"
              style={{ background: `linear-gradient(135deg, ${member.color}, #ffffff)` }}
            />
            
            <div>
              {/* Profile Image avatar wrapper */}
              <div 
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-md border-2 relative overflow-hidden bg-slate-50 group-hover:border-purple-400 group-hover:shadow-lg transition-all duration-300"
                style={{ borderColor: member.imageUrl ? `${member.color}80` : `${member.color}40` }}
              >
                {member.imageUrl ? (
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <div 
                  className="absolute inset-0 flex items-center justify-center text-3xl select-none"
                  style={{ 
                    backgroundColor: member.imageUrl ? 'transparent' : `${member.color}15`,
                    zIndex: member.imageUrl ? -1 : 1
                  }}
                >
                  {member.emoji}
                </div>
              </div>

              <h3 className="font-extrabold text-purple-950 text-base mt-5 group-hover:text-purple-700 transition-colors">
                {member.name}
              </h3>
              <p className="text-[10px] font-black tracking-widest uppercase mt-1 font-mono" style={{ color: member.color }}>
                {member.nameEn}
              </p>
            </div>

            {/* Position tag bottom indicator */}
            <div 
              className="mt-6 inline-block self-center text-[10px] font-extrabold px-3 py-1 rounded-full border"
              style={{ 
                backgroundColor: `${member.color}08`, 
                borderColor: `${member.color}50`, 
                color: '#663399' 
              }}
            >
              {member.role.split(" · ")[0]}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Render detailed profile modal popover */}
      {selectedMember && (
        <MemberModal 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}
    </section>
  );
}



=== FILE: Merchandise.tsx (Local Source Extract) ===
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, HelpCircle, Check, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { merchandise as yo, MerchItem } from '../data';

interface MerchandiseProps {
  onAddToCart: (item: MerchItem) => void;
  cartItems: { id: string; quantity: number }[];
}

export default function Merchandise({ onAddToCart, cartItems }: MerchandiseProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? yo 
    : yo.filter(item => item.category === activeCategory);

  const categories = [
    { type: "all", nameZh: "全部商品", nameEn: "All Items" },
    { type: "lightstick", nameZh: "手燈應援", nameEn: "Lightsticks" },
    { type: "album", nameZh: "經典專輯", nameEn: "Albums" },
    { type: "apparel", nameZh: "時尚服飾", nameEn: "Apparel" },
    { type: "mascot", nameZh: "Lovelys玩偶", nameEn: "Plush Mascots" },
    { type: "accessories", nameZh: "精選配件", nameEn: "Accessories" }
  ];

  const getStatusStyle = (status: MerchItem['status']) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200/60';
      case 'Limited Edition':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Pre-Order':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Sold Out':
        return 'bg-slate-100 text-slate-500 border-slate-300';
      default:
        return 'bg-purple-50 text-purple-600';
    }
  };

  const getStatusLabel = (status: MerchItem['status']) => {
    switch (status) {
      case 'In Stock':
        return '現貨供應';
      case 'Limited Edition':
        return '限量珍藏';
      case 'Pre-Order':
        return '預購特惠';
      case 'Sold Out':
        return '已售罄';
      default:
        return '一般商品';
    }
  };

  return (
    <section id="merchandise" className="scroll-mt-24 px-6 py-20 bg-gradient-to-b from-[#fcf6e8] to-[#f4f0fa] border-t border-purple-100 relative">
      <div className="absolute top-[5%] right-[5%] text-purple-300 animate-pulse pointer-events-none">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Merchandise Top Slogan */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-2xs">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>OFFICIAL SHOP MERCHANDISE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-purple-950 tracking-tight font-display">
            TWICE 官方<span className="text-purple-600 drop-shadow-3xs px-1.5 underline decoration-wavy decoration-pink-400">周邊商品</span> 🛍️
          </h2>
          <p className="text-purple-700 font-medium text-sm max-w-lg mx-auto mt-4 leading-relaxed">
            為各位 ONCE 嚴選最經典的應援手燈、限量版實體唱片、巡迴服飾與超可愛 Lovelys Mascot，點擊按鈕直接連結 JYP Shop 官方管道安全購買！
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:border-b sm:border-purple-200/50 sm:pb-6">
          {categories.map(category => (
            <button 
              type="button"
              key={category.type}
              onClick={() => setActiveCategory(category.type)}
              className={`px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all duration-300 cursor-pointer flex flex-col items-center ${
                activeCategory === category.type 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-200 scale-103' 
                  : 'bg-white hover:bg-purple-100/40 text-purple-900 border border-purple-100/60 shadow-3xs'
              }`}
            >
              <span className="text-xs">{category.nameZh}</span>
              <span className={`text-[9px] uppercase tracking-widest font-extrabold mt-0.5 ${
                activeCategory === category.type ? 'text-pink-100' : 'text-purple-400'
              }`}>
                {category.nameEn}
              </span>
            </button>
          ))}
        </div>

        {/* Grid List */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => {
              const cartItem = cartItems.find(itemInCart => itemInCart.id === item.id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-400 flex flex-col justify-between transition-all duration-300 h-full overflow-hidden shadow-xs hover:shadow-xl hover:shadow-purple-100"
                >
                  {/* Item Image Card */}
                  <div className="bg-gradient-to-br from-purple-50/60 to-amber-50/60 p-8 text-center relative flex justify-center items-center h-48 border-b border-purple-100/40">
                    <span className="text-7xl drop-shadow-md select-none transform transition-transform duration-300 group-hover:scale-110">
                      {item.emoji}
                    </span>
                    <span className={`absolute top-4 left-4 text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                      getStatusStyle(item.status)
                    }`}>
                      {getStatusLabel(item.status)} · {item.status}
                    </span>
                    <div className="absolute top-4 right-4 bg-white/95 border border-purple-100 px-3 py-1.5 rounded-2xl shadow-3xs flex flex-col items-end">
                      <span className="text-purple-950 font-black text-sm font-display leading-none">
                        NT$ {item.priceTwd.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-purple-400 font-extrabold mt-0.5">
                        USD ${item.priceUsd}
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-4 text-[9px] font-extrabold text-purple-600 bg-purple-100/50 px-2 py-0.5 rounded-md border border-purple-200/20 uppercase tracking-widest leading-none">
                      {item.category}
                    </span>
                  </div>

                  {/* Pricing and Details */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-purple-950 text-base leading-snug">
                        {item.nameZh}
                      </h3>
                      <p className="text-[10px] text-purple-400 font-bold tracking-wider mt-1 mb-4 select-all uppercase">
                        {item.name}
                      </p>
                      <p className="text-purple-900/80 text-[12px] leading-relaxed mb-6 font-semibold">
                        {item.description}
                      </p>

                      <div className="border-t border-purple-100/50 pt-4 mb-6">
                        <span className="text-[10px] font-black tracking-widest text-purple-500 uppercase block mb-3 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-pink-500 fill-pink-500/10" />
                          <span>包裝與內容細節 Box Contents</span>
                        </span>
                        <div className="space-y-1.5">
                          {item.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-purple-950 text-xs">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="font-medium text-purple-900 leading-snug">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2.5">
                      {item.status !== 'Sold Out' ? (
                        <button 
                          type="button"
                          onClick={() => onAddToCart(item)}
                          className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wider transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-2 cursor-pointer ${
                            quantityInCart > 0 
                              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' 
                              : 'bg-purple-100/60 hover:bg-purple-200/80 text-purple-950'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>
                            {quantityInCart > 0 
                              ? `已加入購物車 (${quantityInCart}) · 再加一件` 
                              : '加到收藏購物車 Add to Cart'
                            }
                          </span>
                        </button>
                      ) : (
                        <div className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-center py-3 rounded-xl font-black text-xs uppercase cursor-not-allowed">
                          已售罄 Out Of Stock
                        </div>
                      )}

                      <a 
                        href={item.purchaseUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-gradient-to-r from-[#ffcc66] to-[#ffaa44] hover:from-[#ffd577] hover:to-[#ffb855] text-purple-950 border border-amber-300/40 text-center py-3 px-4 rounded-xl font-black text-xs tracking-wider transition-all duration-200 transform hover:scale-102 flex items-center justify-center gap-2 select-none"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0 text-purple-950" />
                        <span>立即購買 Go to JYP Shop 🛒</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Warning Policy Notes */}
        <div className="mt-16 max-w-2xl mx-auto text-center bg-amber-50/70 border-2 border-dashed border-amber-200 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4">
          <ShieldAlert className="w-8 h-8 text-amber-500 shrink-0" />
          <div className="text-left">
            <span className="font-extrabold text-purple-950 text-sm block">
              💡 購買注意事項 Buying Guideline
            </span>
            <span className="text-xs text-purple-900 mt-1 font-semibold block leading-relaxed">
              本網站為粉絲交流頁面。周邊商品連結均為 <strong>JYP Shop 官方線上商場</strong> 及合作 K-pop 進口唱片店。點選 <strong>「立即購買」</strong> 會為您另開視窗至官方各商品之預購詳情，敬請放心查閱購置。
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}



=== FILE: Navigation.tsx (Local Source Extract) ===
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface NavigationProps {
  onCartToggle: () => void;
  cartCount: number;
}

export default function Navigation({ onCartToggle, cartCount = 0 }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 20 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const d = [
    { name: "成員 Roster", href: "#members" },
    { name: "音樂 Discography", href: "#discography" },
    { name: "重要時刻 Milestone", href: "#timeline" },
    { name: "周邊商品 Merch Shop", href: "#merchandise" },
    { name: "成員小遊戲 Match Game 🎮", href: "#game" },
    { name: "關於 About", href: "#about" }
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      id="main-nav" 
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 flex items-center justify-between ${
        scrolled 
          ? 'bg-amber-50/90 backdrop-blur-md shadow-md border-b border-purple-200' 
          : 'bg-amber-50/70 backdrop-blur-xs'
      }`}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <svg 
          width="42" 
          height="42" 
          viewBox="0 0 100 100" 
          className="filter drop-shadow-[0_2px_8px_rgba(153,102,204,0.3)] select-none cursor-pointer"
          onClick={handleLogoClick}
        >
          <defs>
            <linearGradient id="twice-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#9966cc', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ff66cc', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="30" cy="32" r="16" fill="url(#twice-grad)" opacity="0.95" />
          <circle cx="70" cy="32" r="16" fill="url(#twice-grad)" opacity="0.95" />
          <rect x="18" y="58" width="64" height="10" rx="5" fill="url(#twice-grad)" opacity="0.85" />
          <circle cx="50" cy="80" r="4" fill="url(#twice-grad)" />
        </svg>

        <div className="select-none cursor-pointer" onClick={handleLogoClick}>
          <span className="text-xl font-black tracking-widest text-purple-950 font-display block leading-none notranslate">
            TWICE
          </span>
          <span className="text-[10px] text-purple-700 font-extrabold tracking-[4px] uppercase block mt-1 notranslate">
            Fan Portal
          </span>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {d.map(item => (
          <a 
            key={item.name} 
            href={item.href} 
            className="text-purple-950 hover:text-purple-600 font-bold text-xs tracking-wider transition-colors duration-200 uppercase relative group py-1"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
        {onCartToggle && (
          <button 
            type="button"
            onClick={onCartToggle} 
            id="nav-cart-btn" 
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full relative transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md shadow-purple-200 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-100 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Mobile Right Controls */}
      <div className="flex md:hidden items-center gap-4">
        {onCartToggle && (
          <button 
            type="button"
            onClick={onCartToggle} 
            id="nav-cart-btn-mobile" 
            className="p-2 text-purple-950 relative cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-amber-100">
                {cartCount}
              </span>
            )}
          </button>
        )}
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          id="mobile-menu-burger" 
          className="text-purple-950 p-1 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-17 left-0 w-full bg-amber-50/95 backdrop-blur-md border-b border-purple-200 flex flex-col p-6 gap-4 shadow-xl md:hidden z-40 animate-fadeUp">
          {d.map(item => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-purple-950 hover:text-purple-700 font-bold text-sm tracking-wider py-2 border-b border-purple-100/50"
            >
              {item.name}
            </a>
          ))}
          {onCartToggle && (
            <button 
              type="button"
              onClick={() => { setMobileMenuOpen(false); onCartToggle(); }} 
              className="mt-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs tracking-wider cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              查看我的購物車 ({cartCount})
            </button>
          )}
        </div>
      )}
    </nav>
  );
}



=== FILE: Timeline.tsx (Local Source Extract) ===
import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Award, Sparkles } from 'lucide-react';
import { milestones } from '../data';

export default function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-24 px-6 py-20 max-w-5xl mx-auto">
      {/* Introduction Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-2xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>CHRONOLOGY Timeline</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-purple-950 tracking-tight font-display">
          重要<span className="text-amber-500 drop-shadow-3xs px-1.5 underline decoration-wavy decoration-purple-400">時刻</span> 📅
        </h2>
        <p className="text-purple-700 font-medium text-sm max-w-lg mx-auto mt-4 leading-relaxed">
          陪伴 TWICE 一路走來，見證她們從青澀出道至加冕世界女團之巔的每一個精彩瞬間。
        </p>
      </div>

      {/* Milestones Cards List */}
      <div className="flex flex-col gap-6 relative">
        {milestones.map((item, idx) => {
          // Cyclical border color and background shading based on index
          const themeStyle = idx % 3 === 0 
            ? 'border-l-4 border-purple-500 bg-purple-50/25' 
            : idx % 3 === 1 
            ? 'border-l-4 border-amber-500 bg-amber-50/25' 
            : 'border-l-4 border-pink-500 bg-pink-50/30';

          return (
            <motion.div
              key={item.year + idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`rounded-2xl p-6 md:p-8 shadow-2xs border border-purple-100/40 relative overflow-hidden flex flex-col gap-3 transition-colors duration-200 ${themeStyle}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mr-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-extrabold text-purple-950 bg-white shadow-3xs px-3.5 py-1 rounded-lg border border-purple-100 font-display">
                    {item.year}
                  </span>
                  <h3 className="text-base font-black text-purple-950 font-sans">
                    {item.period}
                  </h3>
                </div>
                
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${item.badgeStyle}`}>
                  {item.badge}
                </span>
              </div>

              <h4 className="text-purple-700 font-extrabold text-xs tracking-wider mt-1.5 uppercase">
                {item.title}
              </h4>
              <p className="text-purple-900 text-[13px] leading-relaxed font-semibold">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

