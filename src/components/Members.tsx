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
