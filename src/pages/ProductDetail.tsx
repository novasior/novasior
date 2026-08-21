import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getProductBySlug } from '../data/products';
import { useCartStore } from '../store';
import { ChevronDown, Check, ShoppingBag, Zap, Smartphone, Monitor, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { WallpaperItem } from '../types';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addItem, buyNow, items } = useCartStore();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [wallpaperFilter, setWallpaperFilter] = useState<'all' | 'mobile' | 'desktop'>('all');
  const [activeModalWallpaper, setActiveModalWallpaper] = useState<WallpaperItem | null>(null);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-transparent text-brand-text">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-sm font-semibold tracking-wide text-brand-accent hover:underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const isInCart = items.some((item) => item.product.id === product.id);
  const isEbook = product.slug === '10-lessons' || product.id === 'a0000000-0000-4000-8000-000000000003';
  const isTracker = product.slug === 'life-tracker' || product.id === 'a0000000-0000-4000-8000-000000000002';
  const mobileWallpapers = product.wallpapers?.filter((w) => w.type === 'mobile') ?? [];
  const desktopWallpapers = product.wallpapers?.filter((w) => w.type === 'desktop') ?? [];

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleBuyNow = () => {
    buyNow(product);
    navigate('/checkout');
  };

  const faqs = [
    { q: "Is this a physical product?", a: "No, this is a digital product. You will receive immediate access after purchase." },
    { q: "Can I use it on multiple devices?", a: "Yes, it is designed to be accessible across your desktop and mobile devices." },
    ...(product.faq ? product.faq.map(f => ({ q: f.question, a: f.answer })) : []),
    { q: "How long do I have access?", a: "You have lifetime access to the product and any future updates." }
  ];

  return (
    <div className="w-full pt-24 md:pt-32 pb-32 bg-transparent text-brand-text">
      
      {/* PRODUCT HERO */}
      <section className="max-w-[72rem] mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* Left: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 flex flex-col"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-brand-text tracking-tight">
              {product.name}
            </h1>
            <p className="text-base font-medium text-brand-text-muted mb-8 max-w-lg leading-relaxed">
              {product.shortDescription}
            </p>
            
            <div className="text-3xl font-bold mb-8 text-brand-text">₹{product.price.toFixed(0)}</div>
            
            <div className="space-y-4 mb-8">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">What's included</h4>
               <ul className="space-y-2">
                 {product.features.slice(0, 3).map((feat, idx) => (
                   <li key={idx} className="flex items-center gap-3 text-[13px] font-medium text-brand-text">
                     <Check size={14} className="text-brand-accent flex-shrink-0" />
                     {feat}
                   </li>
                 ))}
               </ul>
            </div>
            
            <div className="max-w-md flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-white border border-brand-border text-brand-text rounded-[12px] text-[13px] font-semibold tracking-wide hover:bg-neutral-50 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} className="text-brand-accent" />
                {isInCart ? 'In Cart (View)' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-brand-text text-white rounded-[12px] text-[13px] font-semibold tracking-wide hover:bg-brand-text/90 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Zap size={16} className="fill-white" />
                Buy Now — ₹{product.price.toFixed(0)}
              </button>
            </div>
          </motion.div>

          {/* Right: Small product visual */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] bg-white rounded-[24px] border border-brand-border p-3 shadow-md relative group overflow-hidden">
               <div className="absolute inset-0 bg-brand-accent/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
               <img 
                 src={product.heroImage} 
                 alt={product.name} 
                 className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-700 ease-out"
               />
            </div>
          </motion.div>

        </div>
      </section>

      {/* WHAT IT SOLVES */}
      <section className="max-w-[72rem] mx-auto px-6 md:px-12 mb-24">
        <div className="bg-white rounded-[20px] border border-brand-border p-8 md:p-12 shadow-sm text-center">
           <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 block">WHAT IT SOLVES</span>
           <p className="text-lg md:text-xl font-medium text-brand-text leading-relaxed max-w-3xl mx-auto">
             {product.description}
           </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="max-w-[72rem] mx-auto px-6 md:px-12 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-brand-text">What's Included</h2>
        </div>
        <div className={isEbook ? 'flex justify-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {product.includedItems?.map((item, idx) => (
             <div key={idx} className={`bg-white border border-brand-border rounded-[16px] p-6 shadow-sm flex flex-col gap-4 ${isEbook ? 'items-center text-center w-full sm:w-1/2' : 'items-start'}`}>
               <div className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text">
                 <Check size={14} />
               </div>
               <p className="text-[14px] font-medium text-brand-text-muted">{item}</p>
             </div>
          ))}
        </div>
      </section>      {/* PRODUCT PREVIEW */}
      <section className="max-w-[72rem] mx-auto px-6 md:px-12 mb-24">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-2 block">
            {isEbook ? 'Sample Excerpts' : isTracker ? 'Habit Tracker Previews' : 'Extracted PDF Collection'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-text">
            {isEbook ? 'Ebook Preview' : isTracker ? 'Habit Tracker Overview' : 'Wallpaper Collection Showcase'}
          </h2>
          <p className="text-[14px] text-brand-text-muted mt-2 max-w-xl mx-auto">
            {isEbook
              ? 'Preview select pages from the ebook. Click any image to open a full-screen preview.'
              : isTracker
                ? 'Explore habit tracker page previews and sample layouts to see how easy it is to plan daily progress.'
                : 'Explore all 25 high-resolution designs included in your download. Click any image to preview in full screen.'}
          </p>

          {/* Filter Tabs */}
          {product.wallpapers && product.wallpapers.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => setWallpaperFilter('all')}
                className={`px-4 py-2 rounded-[10px] text-[12px] font-semibold transition-all ${
                  wallpaperFilter === 'all'
                    ? 'bg-brand-text text-white shadow-sm'
                    : 'bg-white text-brand-text-muted hover:text-brand-text border border-brand-border'
                }`}
              >
                All Wallpapers ({product.wallpapers.length})
              </button>
              <button
                onClick={() => setWallpaperFilter('mobile')}
                className={`px-4 py-2 rounded-[10px] text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                  wallpaperFilter === 'mobile'
                    ? 'bg-brand-text text-white shadow-sm'
                    : 'bg-white text-brand-text-muted hover:text-brand-text border border-brand-border'
                }`}
              >
                <Smartphone size={14} />
                Mobile ({product.wallpapers.filter(w => w.type === 'mobile').length})
              </button>
              <button
                onClick={() => setWallpaperFilter('desktop')}
                className={`px-4 py-2 rounded-[10px] text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                  wallpaperFilter === 'desktop'
                    ? 'bg-brand-text text-white shadow-sm'
                    : 'bg-white text-brand-text-muted hover:text-brand-text border border-brand-border'
                }`}
              >
                <Monitor size={14} />
                Desktop ({product.wallpapers.filter(w => w.type === 'desktop').length})
              </button>
            </div>
          )}
        </div>

        {/* Wallpapers Grid */}
        {product.wallpapers && product.wallpapers.length > 0 ? (
          wallpaperFilter === 'all' ? (
            <>
              <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-brand-text">Mobile Wallpapers</h3>
                    <p className="text-sm text-brand-text-muted mt-2">Browse the full set of mobile-ready wallpaper previews.</p>
                  </div>
                  <span className="text-sm text-brand-text-muted">{mobileWallpapers.length} items</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {mobileWallpapers.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
                      onClick={() => setActiveModalWallpaper(item)}
                      className="group relative bg-white rounded-[16px] border border-brand-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="relative w-full overflow-hidden bg-black/90 aspect-[9/16]">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                          <span className="bg-white/90 backdrop-blur-md text-brand-text text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Maximize2 size={12} /> {isEbook ? 'Preview Page' : 'Preview 8K'}
                          </span>
                        </div>
                        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-md border border-white/10">
                          {item.type}
                        </div>
                      </div>
                      <div className="p-3 bg-white border-t border-brand-border flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold text-brand-accent tracking-wider uppercase">{item.theme}</span>
                        <h3 className="text-[13px] font-bold text-brand-text line-clamp-1 group-hover:text-brand-accent transition-colors">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-[11px] font-medium text-brand-text-muted line-clamp-1">{item.subtitle}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-brand-text">Laptop Wallpapers</h3>
                    <p className="text-sm text-brand-text-muted mt-2">Browse the laptop-ready wallpaper previews in a dedicated section.</p>
                  </div>
                  <span className="text-sm text-brand-text-muted">{desktopWallpapers.length} items</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {desktopWallpapers.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
                      onClick={() => setActiveModalWallpaper(item)}
                      className="group relative bg-white rounded-[16px] border border-brand-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="relative w-full overflow-hidden bg-black/90 aspect-[16/10]">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                          <span className="bg-white/90 backdrop-blur-md text-brand-text text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Maximize2 size={12} /> Preview 8K
                          </span>
                        </div>
                        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-md border border-white/10">
                          {item.type}
                        </div>
                      </div>
                      <div className="p-3 bg-white border-t border-brand-border flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold text-brand-accent tracking-wider uppercase">{item.theme}</span>
                        <h3 className="text-[13px] font-bold text-brand-text line-clamp-1 group-hover:text-brand-accent transition-colors">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-[11px] font-medium text-brand-text-muted line-clamp-1">{item.subtitle}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {product.wallpapers
                .filter(w => wallpaperFilter === 'all' || w.type === wallpaperFilter)
                .map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
                    onClick={() => setActiveModalWallpaper(item)}
                    className="group relative bg-white rounded-[16px] border border-brand-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Aspect Ratio Container */}
                    <div className={`relative w-full overflow-hidden bg-black/90 ${item.type === 'desktop' ? 'aspect-[16/10]' : 'aspect-[9/16]'}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                        <span className="bg-white/90 backdrop-blur-md text-brand-text text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <Maximize2 size={12} /> Preview 8K
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-md border border-white/10">
                        {item.type}
                      </div>
                    </div>

                    {/* Card Info Footer */}
                    <div className="p-3 bg-white border-t border-brand-border flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-brand-accent tracking-wider uppercase">{item.theme}</span>
                      <h3 className="text-[13px] font-bold text-brand-text line-clamp-1 group-hover:text-brand-accent transition-colors">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[11px] font-medium text-brand-text-muted line-clamp-1">{item.subtitle}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          )
        ) : product.galleryImages && product.galleryImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {product.galleryImages.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                onClick={() => setActiveModalWallpaper({
                  id: `g-${idx}`,
                  title: product.name,
                  type: 'desktop',
                  theme: isEbook ? 'Ebook Excerpt' : product.name,
                  image: img,
                  subtitle: isEbook ? `Page ${idx + 1}` : undefined
                })}
                className={`relative rounded-[16px] overflow-hidden shadow-sm border border-brand-border bg-white group aspect-square cursor-pointer`}
              >
                <div className="absolute inset-0 bg-brand-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                <img 
                  src={img} 
                  alt={`${product.name} preview ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 backdrop-blur-md text-brand-text text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Maximize2 size={12} /> {isEbook ? 'Preview Page' : 'Preview'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-white rounded-[24px] border border-brand-border shadow-sm flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-accent/5"></div>
            {/* Abstract mock preview */}
            <div className="w-[80%] h-[120%] bg-white rounded-t-[16px] shadow-2xl border border-brand-border mt-20 flex flex-col relative z-10">
               <div className="h-12 border-b border-brand-border flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-border"></div>
               </div>
               <div className="flex-1 p-8 flex gap-8">
                 <div className="w-1/4 flex flex-col gap-4">
                   <div className="h-4 bg-brand-bg rounded w-3/4"></div>
                   <div className="h-4 bg-brand-bg rounded w-1/2"></div>
                   <div className="h-4 bg-brand-bg rounded w-full"></div>
                   <div className="h-4 bg-brand-bg rounded w-2/3"></div>
                 </div>
                 <div className="w-3/4 flex flex-col gap-6">
                   <div className="h-32 bg-brand-bg rounded-[12px] w-full"></div>
                   <div className="flex gap-4">
                     <div className="h-24 bg-brand-bg rounded-[12px] flex-1"></div>
                     <div className="h-24 bg-brand-bg rounded-[12px] flex-1"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}
      </section>

      {/* BENEFITS */}
      <section className="max-w-[72rem] mx-auto px-6 md:px-12 mb-24">
        <div className="bg-white rounded-[20px] border border-brand-border p-8 md:p-12 shadow-sm text-center">
           <h2 className="text-2xl font-bold tracking-tight text-brand-text mb-8">Why this works</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {product.benefits?.map((benefit, idx) => (
               <div key={idx} className="flex flex-col items-center">
                 <span className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text font-bold text-[12px] shadow-sm mb-4">
                   {idx + 1}
                 </span>
                 <p className="text-[14px] font-medium text-brand-text-muted leading-relaxed max-w-sm">
                   {benefit}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-[72rem] mx-auto px-6 md:px-12 mb-24">
        <div className="bg-white rounded-[20px] border border-brand-border p-8 md:p-12 shadow-sm text-center">
          <h2 className="text-2xl font-bold tracking-tight text-brand-text mb-8">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text font-bold text-[12px] shadow-sm mb-4">
                01
              </span>
              <h3 className="text-[16px] font-bold text-brand-text mb-2">Get Access</h3>
              <p className="text-[14px] font-medium text-brand-text-muted leading-relaxed max-w-sm">
                Download the product instantly.
              </p>
            </div>
            <div className="text-center flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text font-bold text-[12px] shadow-sm mb-4">
                02
              </span>
              <h3 className="text-[16px] font-bold text-brand-text mb-2">Customize</h3>
              <p className="text-[14px] font-medium text-brand-text-muted leading-relaxed max-w-sm">
                Adapt it to your specific goals.
              </p>
            </div>
            <div className="text-center flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text font-bold text-[12px] shadow-sm mb-4">
                03
              </span>
              <h3 className="text-[16px] font-bold text-brand-text mb-2">Execute</h3>
              <p className="text-[14px] font-medium text-brand-text-muted leading-relaxed max-w-sm">
                Use it daily to build discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 md:px-12 mb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-brand-text tracking-tight">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-[12px] overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 flex justify-between items-center text-left hover:bg-brand-bg transition-colors"
                >
                  <span className="font-semibold text-[14px] text-brand-text">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`flex-shrink-0 transition-transform duration-300 text-brand-text-muted ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-brand-text-muted text-[14px] leading-relaxed p-5 pt-0 font-medium">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center border-t border-brand-border pt-24">
          <h2 className="text-2xl font-bold mb-6 text-brand-text tracking-tight">
            Ready to upgrade your tools?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleAddToCart}
              className="bg-white border border-brand-border text-brand-text rounded-[12px] px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-neutral-50 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <ShoppingBag size={16} className="text-brand-accent" />
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-brand-text text-white rounded-[12px] px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-brand-text/90 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <Zap size={16} className="fill-white" />
              Buy Now — ₹{product.price.toFixed(0)}
            </button>
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeModalWallpaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalWallpaper(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/10 rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalWallpaper(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors border border-white/20"
              >
                <X size={18} />
              </button>

              {/* Wallpaper Full Preview */}
              <div className="flex-1 bg-black flex items-center justify-center p-4 min-h-[350px] max-h-[60vh] md:max-h-[85vh]">
                <img
                  src={activeModalWallpaper.image}
                  alt={activeModalWallpaper.title}
                  referrerPolicy="no-referrer"
                  className={`max-h-full max-w-full object-contain rounded-[12px] shadow-2xl ${
                    activeModalWallpaper.type === 'mobile' ? 'aspect-[9/16]' : 'aspect-[16/9]'
                  }`}
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 bg-[#111111] text-white border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-brand-accent/20 text-brand-accent text-[10px] font-bold tracking-wider uppercase mb-3">
                    {activeModalWallpaper.type} Wallpaper • {activeModalWallpaper.theme}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">
                    {activeModalWallpaper.title}
                  </h3>
                  {activeModalWallpaper.subtitle && (
                    <p className="text-sm text-neutral-400 mb-6 font-medium">
                      {activeModalWallpaper.subtitle}
                    </p>
                  )}
                  
                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-neutral-300 font-medium">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Resolution</span>
                      <span className="font-semibold text-white">Ultra 8K / 4K Crisp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Format</span>
                      <span className="font-semibold text-white">
                        {isTracker ? '.xlsx' : isEbook ? 'PDF' : 'PNG / JPG'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Compatibility</span>
                      <span className="font-semibold text-white">
                        {product.slug === '10-lessons' || product.id === 'a0000000-0000-4000-8000-000000000003'
                          ? 'Windows, macOS, Linux, Android, iOS'
                          : (activeModalWallpaper.type === 'mobile'
                              ? 'Android, iOS'
                              : 'Windows, macOS, iOS, Android')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setActiveModalWallpaper(null);
                      handleAddToCart();
                    }}
                    className="w-full py-3 bg-white text-black font-semibold rounded-[12px] text-xs hover:bg-neutral-200 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    {isInCart ? 'In Cart (View)' : 'Get Full Collection (₹299)'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
