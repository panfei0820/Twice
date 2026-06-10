import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Members from './components/Members';
import Discography from './components/Discography';
import Timeline from './components/Timeline';
import Merchandise from './components/Merchandise';
import About from './components/About';
import MemberGame from './components/MemberGame';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { merchandise as yo, MerchItem } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  emoji: string;
}

export default function App() {
  const [cartItems, setCartItems] = useState<{ id: string; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast notifier helper
  const addToast = (msg: string, emoji: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(2, 9),
      message: msg,
      emoji: emoji
    };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3200);
  };

  // Add Item to cart quantity counter
  const handleAddToCart = (item: MerchItem) => {
    setCartItems(prev => {
      const match = prev.find(i => i.id === item.id);
      if (match) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { id: item.id, quantity: 1 }];
      }
    });
    addToast(`已將「${item.nameZh}」加進應援備忘！`, item.emoji);
  };

  // Update item quantity
  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: nextQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Remove Item from shopping cart
  const handleRemoveItem = (id: string) => {
    const matchedItem = yo.find(m => m.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    if (matchedItem) {
      addToast(`已從備忘清單移除「${matchedItem.nameZh}」`, "🗑️");
    }
  };

  // Clear cart list completely
  const handleClearCart = () => {
    setCartItems([]);
    addToast("已清空所有備忘項目", "🧹");
  };

  // Count aggregate quantities
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-b from-[#fcf6e8] to-[#f5f1fc] text-purple-950 antialiased font-sans">
      
      {/* Decorative Ornaments background spots */}
      <div className="fixed top-[15%] left-[2%] opacity-15 pointer-events-none animate-float z-0">
        <div className="w-[100px] h-[100px] rounded-full bg-pink-300 blur-2xl" />
      </div>
      <div className="fixed bottom-[15%] right-[2%] opacity-10 pointer-events-none animate-float z-0" style={{ animationDelay: "3s" }}>
        <div className="w-[150px] h-[150px] rounded-full bg-purple-300 blur-3xl" />
      </div>

      {/* 1. Header Navigation Bar */}
      <Navigation 
        onCartToggle={() => setCartOpen(true)} 
        cartCount={totalCartCount} 
      />

      {/* 2. Main Page Layout Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <Members />
        <Discography />
        <Timeline />
        <Merchandise onAddToCart={handleAddToCart} cartItems={cartItems} />
        <About />
        
        {/* The requested Guessing Game (猜猜樂) Section at the very end */}
        <MemberGame />
      </main>

      {/* 3. Footer Elements */}
      <Footer />

      {/* 4. Slide-out Side Cart Drawer panel */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        merchandiseList={yo}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 5. Custom Floating Toasts Alert Stack */}
      <div className="fixed bottom-6 left-6 z-100 flex flex-col gap-2.5 max-w-sm w-full font-sans pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-purple-955 text-white/95 rounded-2xl p-4 shadow-xl border border-purple-800/80 flex items-center gap-3.5 pointer-events-auto"
              style={{ backgroundColor: '#1e0b36' }}
            >
              <span className="text-2xl select-none shrink-0">{toast.emoji}</span>
              <div className="flex-1">
                <p className="text-xs font-bold font-sans tracking-wide leading-tight">
                  {toast.message}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-purple-300 hover:text-white shrink-0 p-0.5 cursor-pointer hover:bg-white/10 rounded-md transition-colors"
                aria-label="Dismiss alert toast"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
