import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { ArrowRight, Check, ChevronDown, ShoppingBag, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem, buyNow, items } = useCartStore();
  const navigate = useNavigate();

  const faqs = [
    { q: "What are NOVASIOR products?", a: "NOVASIOR creates premium digital products—wallpapers, trackers, and guides—designed to help ambitious individuals build discipline and execute their goals." },
    { q: "How do I receive my purchase?", a: "Your files are available for instant download on the purchase confirmation page, and secure download links are also sent to your email and saved to your profile." },
    { q: "Are the products digital?", a: "Yes, all NOVASIOR products are 100% digital. No physical items will be shipped, allowing for immediate access and implementation." },
    { q: "Can I use them on mobile and desktop?", a: "Absolutely. Our tools are designed to be flexible and can be used across your devices." },
    { q: "Can I get a refund?", a: "Due to the digital nature of our products, all sales are final. We provide comprehensive previews so you know exactly what you are investing in." },
    { q: "Can I use the products commercially?", a: "No. All NOVASIOR products are for personal use only and cannot be resold, redistributed, or used for commercial client work." }
  ];

  return (
    <div className="w-full bg-transparent text-brand-text font-sans selection:bg-brand-accent selection:text-white pb-32">
      
      {/* 07 — HOMEPAGE HERO */}
      <section className="pt-40 pb-20 px-6 md:px-12 flex flex-col items-center text-center">
        <div className="max-w-[72rem] mx-auto w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 hover:scale-105 transition-transform duration-300"
          >
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-text-muted bg-white border border-brand-border px-4 py-1.5 rounded-full shadow-sm">
              BUILT FOR THE AMBITIOUS
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.75rem] md:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight max-w-4xl mb-6 text-brand-text"
          >
            Become Someone Impossible To Ignore.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-text-muted max-w-2xl mb-10 font-medium leading-relaxed text-balance"
          >
            Premium digital products designed to turn ambition into structure, discipline into consistency, and goals into identity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16"
          >
            <Link 
              to="/shop"
              className="bg-brand-text text-brand-bg rounded-[12px] px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:bg-brand-text/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-md"
            >
              Explore Products
            </Link>
            <Link 
              to="/philosophy"
              className="bg-white border border-brand-border text-brand-text rounded-[12px] px-8 py-3.5 text-[13px] font-semibold tracking-wide hover:border-brand-text/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center shadow-sm"
            >
              Our Philosophy
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 09 — FEATURE CARDS */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[72rem] mx-auto text-center mb-12">
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-3xl font-bold text-brand-text tracking-tight capitalize"
           >
             Build discipline, shape your identity, execute with clarity.
           </motion.h2>
        </div>
        <div className="max-w-[72rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Build Discipline', desc: 'Resources designed to help turn intentions into consistent execution.' },
            { num: '02', title: 'Shape Your Identity', desc: 'Tools designed around the person you want to become.' },
            { num: '03', title: 'Execute With Clarity', desc: 'Simple digital products for goals, habits and focused progress.' }
          ].map((feature, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx} 
              className="bg-white p-8 rounded-[16px] border border-brand-border shadow-sm flex flex-col items-start hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-10 h-10 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-[11px] font-bold text-brand-text mb-6 shadow-sm">
                {feature.num}
              </span>
              <h3 className="text-lg font-semibold mb-3 text-brand-text">{feature.title}</h3>
              <p className="text-[14px] text-brand-text-muted leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10 — "WHAT IS NOVASIOR?" SECTION */}
      <section className="py-12 px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[72rem] mx-auto bg-white rounded-[24px] border border-brand-border p-8 md:p-16 shadow-sm flex flex-col items-center hover:shadow-lg transition-all duration-500 text-center"
        >
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted mb-6 block">
              WHAT IS NOVASIOR?
            </span>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-brand-text tracking-tight"
            >
              A digital tool for people who refuse average.
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6 text-base text-brand-text-muted font-medium leading-relaxed"
            >
              <p>
                NOVASIOR creates premium digital tools built around discipline, ambition, personal growth and intentional execution.
              </p>
              <p>
                The goal is not temporary motivation.
              </p>
              <p>
                The goal is to help people build the identity and habits required to become who they want to be.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 11 — PRODUCT SHOWCASE SECTION */}
      <section className="py-12 px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[72rem] mx-auto bg-white rounded-[24px] border border-brand-border p-8 md:p-16 shadow-sm flex flex-col items-center hover:shadow-lg transition-all duration-500 text-center"
        >
          
          <div className="flex flex-col items-center justify-center max-w-2xl mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight"
            >
              Tools for the person you're becoming.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base text-brand-text-muted mb-12 font-medium leading-relaxed max-w-md"
            >
              Simple digital products built around ambition, discipline, personal growth and the decision to live beyond average.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
               <div className="border border-brand-border rounded-[12px] p-4 text-center bg-brand-bg shadow-sm hover:-translate-y-1 transition-transform w-[120px]">
                 <span className="block text-[10px] font-bold text-brand-text-muted mb-1">01</span>
                 <span className="block text-[11px] font-semibold tracking-widest uppercase text-brand-text">DISCIPLINE</span>
               </div>
               <div className="border border-brand-border rounded-[12px] p-4 text-center bg-brand-bg shadow-sm hover:-translate-y-1 transition-transform w-[120px]">
                 <span className="block text-[10px] font-bold text-brand-text-muted mb-1">02</span>
                 <span className="block text-[11px] font-semibold tracking-widest uppercase text-brand-text">IDENTITY</span>
               </div>
               <div className="border border-brand-border rounded-[12px] p-4 text-center bg-brand-bg shadow-sm hover:-translate-y-1 transition-transform w-[120px]">
                 <span className="block text-[10px] font-bold text-brand-text-muted mb-1">03</span>
                 <span className="block text-[11px] font-semibold tracking-widest uppercase text-brand-text">EXECUTION</span>
               </div>
            </motion.div>
          </div>
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
             {products.map((product, idx) => {
               const isInCart = items.some((item) => item.product.id === product.id);

               return (
                 <motion.div 
                   key={product.id} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
                   className="bg-brand-bg rounded-[20px] border border-brand-border p-6 flex flex-col justify-between hover:border-brand-text/30 hover:-translate-y-1 transition-all duration-300 shadow-sm text-left group"
                 >
                   <div>
                     <div className="w-full aspect-[16/10] rounded-[14px] bg-white border border-brand-border overflow-hidden shadow-xs relative mb-4">
                        <img 
                          src={product.heroImage} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                     </div>
                     <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-brand-text text-[16px] group-hover:text-brand-accent transition-colors">{product.name}</h4>
                       <span className="text-sm font-bold text-brand-text bg-white px-2.5 py-0.5 rounded-lg border border-brand-border shrink-0">₹{product.price.toFixed(0)}</span>
                     </div>
                     <p className="text-[12px] text-brand-text-muted font-medium line-clamp-2 mb-6">{product.shortDescription}</p>
                   </div>

                   <div className="pt-3 border-t border-brand-border/60 flex flex-col gap-2">
                     <div className="grid grid-cols-2 gap-2">
                       <button 
                         onClick={() => addItem(product)}
                         className="py-2.5 px-2 bg-white border border-brand-border text-brand-text text-[11px] font-semibold rounded-[10px] hover:bg-neutral-50 transition-colors shadow-xs flex items-center justify-center gap-1"
                       >
                         <ShoppingBag size={13} className="text-brand-accent" />
                         {isInCart ? 'In Cart' : 'Add to Cart'}
                       </button>
                       <button 
                         onClick={() => {
                           buyNow(product);
                           navigate('/checkout');
                         }}
                         className="py-2.5 px-2 bg-brand-text text-white text-[11px] font-semibold rounded-[10px] hover:bg-brand-text/90 transition-colors shadow-xs flex items-center justify-center gap-1"
                       >
                         <Zap size={13} className="fill-white" />
                         Buy Now
                       </button>
                     </div>
                     <Link 
                       to={`/product/${product.slug}`}
                       className="w-full py-1.5 text-brand-text-muted hover:text-brand-text text-[11px] font-semibold text-center transition-colors flex justify-center items-center gap-1"
                     >
                       View Details <ArrowRight size={13} />
                     </Link>
                   </div>
                 </motion.div>
               );
             })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-text text-brand-bg rounded-xl px-10 py-4 text-[14px] font-semibold tracking-wide hover:bg-brand-text/90 hover:scale-105 transition-all shadow-sm group"
            >
              Explore Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
        </motion.div>
      </section>

      {/* 13 — SOCIAL PROOF SECTION */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[72rem] mx-auto text-center mb-16 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold tracking-widest uppercase text-brand-text-muted bg-white border border-brand-border px-3 py-1 rounded-full mb-6 shadow-sm"
          >
            THE NOVASIOR STANDARD
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight"
          >
            Built for people who expect more from themselves.
          </motion.h2>
        </div>
        
        <div className="max-w-[72rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              quote: "Before using these tools, I was constantly jumping between different productivity apps and losing focus. The life tracker is incredibly well thought out, forcing me to actually look at my daily inputs rather than just setting vague goals. It's completely changed how I approach my week.", 
              name: "Aarav Patel", 
              image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop", 
              stars: 5 
            },
            { 
              quote: "The 10 Lessons guide is exactly the reality check I needed. It doesn't give you false motivation; it breaks down the exact mindset required to build discipline. I've implemented the first three lessons and my consistency has skyrocketed.", 
              name: "Priya Sharma", 
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", 
              stars: 5 
            },
            { 
              quote: "I've bought dozens of planners and systems over the years, but this is the first one that feels like it's holding me to a higher standard. The aesthetic is premium, but the real value is in the execution framework it forces you to adopt.", 
              name: "James Wilson", 
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", 
              stars: 5 
            },
            { 
              quote: "Solid resources. The trackers are clean and the philosophy is spot on. I've been using the wallpapers to keep my goals visible at all times, and it definitely helps with focus.", 
              name: "Karan Singh", 
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", 
              stars: 4 
            },
            { 
              quote: "Really good framework for discipline. The guides get straight to the point without the usual self-help fluff. Worth the investment if you are serious about your growth.", 
              name: "Elena Rostova", 
              image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", 
              stars: 4 
            },
            { 
              quote: "It's decent. Does exactly what it says.", 
              name: "Rahul Desai", 
              image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop", 
              stars: 3 
            }
          ].map((testimonial, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx} 
              className="bg-white rounded-[16px] border border-brand-border p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
               <div className={`mb-6 ${testimonial.stars >= 4 ? 'text-brand-accent' : 'text-brand-text-muted'}`}>
                 <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < testimonial.stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                     </svg>
                   ))}
                 </div>
               </div>
               <p className="text-[14px] text-brand-text-muted font-medium leading-relaxed mb-8 flex-1 italic">
                 "{testimonial.quote}"
               </p>
               <div className="flex items-center gap-3">
                 <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full border border-brand-border object-cover" />
                 <div className="flex flex-col">
                   <span className="text-[12px] font-semibold text-brand-text">{testimonial.name}</span>
                   <span className="text-[10px] font-medium text-brand-text-muted">Verified User</span>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 14 — PRODUCT / PRICING SECTION */}
      <section className="py-24 px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[72rem] mx-auto bg-white rounded-[32px] border border-brand-border p-8 md:p-12 lg:p-16 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bg/50 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text tracking-tight mb-4">Choose your product.</h2>
            <p className="text-brand-text-muted font-medium text-base">Start with one digital tool or build your complete NOVASIOR toolkit.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative z-10">
            
            {/* Card 01 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-brand-bg rounded-[20px] border border-brand-border p-8 shadow-sm flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-text-muted block mb-4">DIGITAL ASSETS</span>
                <h3 className="text-xl font-bold text-brand-text mb-4">Motivational Wallpapers</h3>
                <div className="text-3xl font-bold text-brand-text mb-6">₹299</div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addItem(products[0])}
                    className="py-3 px-3 bg-white border border-brand-border text-brand-text text-[12px] font-semibold rounded-[12px] hover:bg-neutral-50 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={14} className="text-brand-accent" />
                    {items.some(i => i.product.id === products[0].id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={() => {
                      buyNow(products[0]);
                      navigate('/checkout');
                    }}
                    className="py-3 px-3 bg-brand-text text-white text-[12px] font-semibold rounded-[12px] hover:bg-brand-text/90 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Zap size={14} className="fill-white" />
                    Buy Now
                  </button>
                </div>
                <Link to="/product/motivational-wallpapers" className="block text-center text-[12px] font-semibold text-brand-text-muted hover:text-brand-text transition-colors py-1">
                  View Details &rarr;
                </Link>
              </div>
            </motion.div>
            
            {/* Card 02 - Featured */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white rounded-[24px] border-2 border-brand-text p-8 md:p-10 shadow-xl relative md:-translate-y-4 z-10 flex flex-col justify-between transition-all duration-300"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-text text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
                MOST POPULAR
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-text-muted block mb-4 mt-2">TRACKING TOOL</span>
                <h3 className="text-2xl font-bold text-brand-text mb-4">Life Tracker</h3>
                <div className="text-4xl font-bold text-brand-text mb-6">₹199</div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addItem(products[1])}
                    className="py-3 px-3 bg-white border border-brand-border text-brand-text text-[12px] font-semibold rounded-[12px] hover:bg-neutral-50 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={14} className="text-brand-accent" />
                    {items.some(i => i.product.id === products[1].id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={() => {
                      buyNow(products[1]);
                      navigate('/checkout');
                    }}
                    className="py-3 px-3 bg-brand-text text-white text-[12px] font-semibold rounded-[12px] hover:bg-brand-text/90 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Zap size={14} className="fill-white" />
                    Buy Now
                  </button>
                </div>
                <Link to="/product/life-tracker" className="block text-center text-[12px] font-semibold text-brand-text-muted hover:text-brand-text transition-colors py-1">
                  View Details &rarr;
                </Link>
              </div>
            </motion.div>
            
            {/* Card 03 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-brand-bg rounded-[20px] border border-brand-border p-8 shadow-sm flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-text-muted block mb-4">DIGITAL GUIDE</span>
                <h3 className="text-xl font-bold text-brand-text mb-4">10 Lessons to Start</h3>
                <div className="text-3xl font-bold text-brand-text mb-6">₹499</div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => addItem(products[2])}
                    className="py-3 px-3 bg-white border border-brand-border text-brand-text text-[12px] font-semibold rounded-[12px] hover:bg-neutral-50 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={14} className="text-brand-accent" />
                    {items.some(i => i.product.id === products[2].id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={() => {
                      buyNow(products[2]);
                      navigate('/checkout');
                    }}
                    className="py-3 px-3 bg-brand-text text-white text-[12px] font-semibold rounded-[12px] hover:bg-brand-text/90 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Zap size={14} className="fill-white" />
                    Buy Now
                  </button>
                </div>
                <Link to="/product/10-lessons" className="block text-center text-[12px] font-semibold text-brand-text-muted hover:text-brand-text transition-colors py-1">
                  View Details &rarr;
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 15 — FAQ */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-brand-text tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-brand-border rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 16 — FINAL CTA */}
      <section className="px-6 md:px-12 mb-20 mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[72rem] mx-auto relative group"
        >
          {/* External Ambient Glow around the sides of the box */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FF0033]/40 via-[#FF6A00]/45 via-[#FFC700]/45 to-[#FF0033]/40 rounded-[38px] blur-xl opacity-75 pointer-events-none"></div>

          <div className="relative bg-gradient-to-br from-[#FAF3EA] via-[#F5E8D6] to-[#ECE1CE] rounded-[32px] border border-[#E0D0B8] p-16 md:p-24 text-center shadow-lg overflow-hidden text-brand-text">
             {/* Custom Mixed Multi-Color Organic Neon Glows (Vibrant Electric Red, Orange, Yellow, Gold) */}
             <div className="absolute -top-24 -left-20 w-[30rem] h-[30rem] bg-gradient-to-r from-[#FF0033]/45 via-[#FF5500]/50 to-[#FFC700]/45 rounded-full blur-[75px] pointer-events-none mix-blend-multiply transform -rotate-12"></div>
             <div className="absolute -bottom-24 -right-20 w-[32rem] h-[32rem] bg-gradient-to-l from-[#FF0033]/45 via-[#FF8800]/45 to-[#C026FF]/50 rounded-full blur-[80px] pointer-events-none mix-blend-multiply transform rotate-45"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] bg-gradient-to-tr from-[#FF0033]/30 via-[#FF6A00]/35 to-[#FFE600]/35 rounded-full blur-[90px] pointer-events-none opacity-90"></div>
             
             <div className="relative z-10 flex flex-col items-center">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-3xl md:text-5xl font-extrabold mb-6 text-brand-text tracking-tight max-w-2xl"
             >
               Build the person you're becoming.
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="text-base text-brand-text-muted mb-10 font-medium max-w-lg"
             >
               The next version of you needs more than motivation. It needs a tool.
             </motion.p>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.4 }}
             >
               <Link 
                 to="/shop"
                 className="bg-brand-text text-brand-bg rounded-xl px-10 py-4 text-[14px] font-semibold tracking-wide hover:bg-brand-text/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 group"
               >
                 Explore NOVASIOR <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
             </motion.div>
           </div>
         </div>
        </motion.div>
      </section>

    </div>
  );
}
