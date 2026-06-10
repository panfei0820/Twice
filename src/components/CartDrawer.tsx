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
