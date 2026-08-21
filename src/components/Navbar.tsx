import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { items, setIsOpen } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <>
      <nav
        className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 rounded-2xl top-4 ${
          isScrolled 
            ? 'w-[90%] lg:w-[85%] max-w-[64rem] bg-white/95 backdrop-blur-md border border-brand-border py-3 shadow-md' 
            : 'w-[95%] lg:w-[90%] max-w-[72rem] bg-white/50 backdrop-blur-md border border-brand-border/50 py-4 shadow-sm'
        }`}
      >
        <div className="mx-auto w-full px-5 sm:px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-widest text-brand-text" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            NOVASIOR
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-[13px] font-sans font-medium text-brand-text-muted hover:text-brand-text transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          
          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => setIsOpen(true)}
              className="relative text-brand-text hover:text-brand-accent transition-transform hover:scale-110 duration-200"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {items.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="absolute -top-1.5 -right-2 bg-brand-accent text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md"
                >
                  {items.length}
                </motion.span>
              )}
            </button>
            <Link
              to="/shop"
              className="bg-brand-text text-brand-bg rounded-xl px-5 py-2 font-sans text-[13px] font-medium hover:bg-brand-text/90 hover:scale-105 transition-all duration-200 shadow-sm"
            >
              Explore
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={() => setIsOpen(true)}
              className="relative text-brand-text hover:text-brand-accent transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-brand-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-brand-text hover:text-brand-accent transition-colors">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-bg flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-brand-text-muted hover:text-brand-text"
            >
              <X size={32} strokeWidth={1} />
            </button>
            
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-sans font-medium tracking-wide text-brand-text hover:text-brand-accent transition-colors duration-300 uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-10">
                <Link
                  to="/shop"
                  className="px-10 py-4 rounded-xl bg-brand-accent text-white font-sans text-sm font-medium tracking-widest uppercase hover:bg-brand-accent/80 transition-colors"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
