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
