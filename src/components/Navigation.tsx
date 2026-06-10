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
