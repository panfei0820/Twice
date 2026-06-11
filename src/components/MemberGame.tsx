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
