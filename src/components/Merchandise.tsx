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
