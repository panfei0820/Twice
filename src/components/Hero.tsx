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
          initial={{ opacity: 0, y: 5 }}
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
