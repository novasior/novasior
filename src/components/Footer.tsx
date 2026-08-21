import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 pb-12 mt-auto relative z-10">
      <div 
        className="max-w-[72rem] mx-auto bg-white border border-brand-border rounded-[32px] p-8 md:p-12 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          <div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-brand-text mb-6">COMPANY</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">About Us</Link></li>
              <li><Link to="/philosophy" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Philosophy</Link></li>
              <li><Link to="/contact" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-brand-text mb-6">PRODUCTS</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">All Products</Link></li>
              <li><Link to="/product/motivational-wallpapers" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Motivational Wallpapers</Link></li>
              <li><Link to="/product/life-tracker" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Life Tracker</Link></li>
              <li><Link to="/product/10-lessons" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">10 Lessons to Start</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-brand-text mb-6">LEGAL</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-brand-text mb-6">SUPPORT</h3>
            <ul className="space-y-4">
              <li><Link to="/support" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/support" className="text-[12px] font-medium text-brand-text-muted hover:text-brand-text transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col justify-center items-center text-center pt-8 border-t border-brand-border gap-2">
          <Link to="/" className="text-xl font-bold tracking-widest text-brand-text block hover:text-brand-accent transition-colors" style={{ fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
            NOVASIOR
          </Link>
          <p className="text-brand-text-muted text-[12px] font-medium">
            &copy; {new Date().getFullYear()} NOVASIOR. All rights reserved.
          </p>
          <span className="text-[12px] font-medium text-brand-text-muted mt-1">
            Become Someone Impossible To Ignore.
          </span>
        </div>
      </div>
    </footer>
  );
}
