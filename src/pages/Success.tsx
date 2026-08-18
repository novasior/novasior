import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useCartStore } from '../store';
import { products } from '../data/products';

export default function OrderSuccess() {
  const { lastOrder, clearCart } = useCartStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    // Clear cart in case it wasn't already cleared
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearCart]);

  // Fallback items if visited directly without state
  const displayOrder = lastOrder || {
    id: 'NOV-849201',
    paymentId: 'pay_demo_123',
    amount: 1299.00,
    currency: 'INR',
    name: 'Valued Customer',
    email: 'customer@novasior.com',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    total: 1299.00,
    items: [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 1 }
    ]
  };

  const handleCopyLink = (productId: string) => {
    const link = `https://novasior.com/downloads/${displayOrder.id}/${productId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(productId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleTriggerDownload = (productName: string, productId: string) => {
    setDownloadingId(productId);
    setTimeout(() => {
      setDownloadingId(null);
      // Create a dummy blob download for immediate user satisfaction
      const element = document.createElement("a");
      const file = new Blob([`NOVASIOR Digital License & Asset Package\n\nProduct: ${productName}\nOrder: ${displayOrder.id}\nLicensed to: ${displayOrder.name}\nKey: NVSR-KEY-${Math.random().toString(36).substring(2, 10).toUpperCase()}\n\nThank you for choosing NOVASIOR. Live Beyond Average.`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${productName.toLowerCase().replace(/\s+/g, '-')}-license.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent text-brand-text font-sans pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Animated Success Badge */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-lg">
              <CheckCircle2 size={48} strokeWidth={2.2} />
            </div>
            {/* Ambient Pulse Ring */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-4 shadow-xs">
              <Sparkles size={13} className="text-emerald-600" />
              ORDER CONFIRMED & UNLOCKED
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-bold uppercase tracking-tight text-brand-text mb-4">
              WELCOME TO THE STANDARD.
            </h1>

            <p className="text-brand-text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Your purchase is complete. You have immediate 4K/8K high-resolution lifetime access to your digital assets below.
            </p>
          </motion.div>
        </div>

        {/* Order Details Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/85 backdrop-blur-md border border-brand-border rounded-3xl p-6 md:p-8 mb-12 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div>
            <span className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-widest mb-1">Order Number</span>
            <span className="font-mono font-bold text-sm text-brand-text">{displayOrder.id}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-widest mb-1">Customer</span>
            <span className="font-semibold text-sm text-brand-text truncate block">{displayOrder.name}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-widest mb-1">Delivered To</span>
            <span className="font-semibold text-sm text-brand-text truncate block">{displayOrder.email}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-brand-text-muted uppercase tracking-widest mb-1">Total Paid</span>
            <span className="font-bold text-sm text-emerald-700">₹{displayOrder.total.toFixed(2)}</span>
          </div>
        </motion.div>

        {/* Instant Digital Download Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-border">
            <h2 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-wide text-brand-text flex items-center gap-2">
              <Download className="text-brand-accent" size={22} />
              YOUR DIGITAL ASSETS
            </h2>
            <span className="text-xs font-semibold text-brand-text-muted">
              {displayOrder.items.length} {displayOrder.items.length === 1 ? 'file ready' : 'files ready'}
            </span>
          </div>

          <div className="space-y-6">
            {displayOrder.items.map(({ product }, idx) => {
              const isDownloading = downloadingId === product.id;
              const isCopied = copiedId === product.id;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-32 aspect-[4/5] bg-brand-bg rounded-2xl overflow-hidden border border-brand-border shrink-0 relative group">
                    <img 
                      src={product.heroImage} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ultra-HD
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase bg-brand-bg border border-brand-border px-3 py-1 rounded-full inline-block mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-brand-text mb-2">
                      {product.name}
                    </h3>
                    <p className="text-brand-text-muted text-xs line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-[11px] font-semibold text-brand-text-muted">
                      <span className="bg-brand-bg px-2.5 py-1 rounded-lg border border-brand-border">4K / 8K PNG</span>
                      <span className="bg-brand-bg px-2.5 py-1 rounded-lg border border-brand-border">High-Res PDF</span>
                      <span className="bg-brand-bg px-2.5 py-1 rounded-lg border border-brand-border">Personal License</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                    <button
                      onClick={() => handleTriggerDownload(product.name, product.id)}
                      disabled={isDownloading}
                      className="px-6 py-3.5 bg-brand-text text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isDownloading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Preparing Asset...</span>
                        </>
                      ) : (
                        <>
                          <Download size={15} />
                          <span>Download Asset</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyLink(product.id)}
                      className="px-6 py-3.5 bg-brand-bg border border-brand-border text-brand-text rounded-xl text-xs font-bold uppercase tracking-wider hover:border-brand-text transition-all flex items-center justify-center gap-2"
                    >
                      {isCopied ? (
                        <>
                          <Check size={15} className="text-emerald-600" />
                          <span className="text-emerald-700">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          <span>Copy Direct Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Support & Next Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-brand-bg border border-brand-border rounded-2xl text-brand-text shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase text-brand-text mb-1">Lifetime Access Guarantee</h4>
              <p className="text-xs text-brand-text-muted">A backup receipt and download key have been dispatched to <strong>{displayOrder.email}</strong>.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/support"
              className="flex-1 md:flex-none px-5 py-3 border border-brand-border text-brand-text rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-bg transition-colors text-center flex items-center justify-center gap-2"
            >
              <HelpCircle size={15} />
              <span>Get Support</span>
            </Link>

            <Link
              to="/shop"
              className="flex-1 md:flex-none px-6 py-3 bg-brand-text text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Explore Shop</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
