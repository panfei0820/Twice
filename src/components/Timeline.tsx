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
