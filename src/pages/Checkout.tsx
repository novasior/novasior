import React, { useState } from 'react';
import { useCartStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Download, CheckCircle2, ArrowRight, Loader2, CreditCard, Smartphone } from 'lucide-react';

export default function Checkout() {
  const { items, getCartTotal, clearCart, setLastOrder } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const finalizeOrderSuccess = (orderId: string, paymentDetails?: { paymentId?: string; amount?: number; currency?: string }) => {
    const newOrder = {
      id: orderId,
      paymentId: paymentDetails?.paymentId ?? '',
      amount: paymentDetails?.amount ?? getCartTotal(),
      currency: paymentDetails?.currency ?? 'INR',
      items: [...items],
      total: getCartTotal(),
      email,
      name: `${firstName} ${lastName}`.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'paid',
    };

    setLastOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    navigate('/success');
  };

  const handleCompletePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getCartTotal(),
          currency: 'INR',
          customerName: `${firstName} ${lastName}`.trim(),
          customerEmail: email,
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data || !data.success) {
        const message = data?.error || `Failed to initiate Razorpay order (${res.status})`;
        throw new Error(message);
      }

      const { order, keyId } = data;

      if (!keyId || keyId.includes('placeholder') || keyId.includes('demo')) {
        throw new Error('Razorpay is not configured. Add a valid key in your Vercel environment variables.');
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay script did not load. Please refresh and try again.');
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'NOVASIOR',
        description: 'Digital Products Order',
        order_id: order.id,
        prefill: {
          name: `${firstName} ${lastName}`.trim(),
          email,
        },
        theme: {
          color: '#111111',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: getCartTotal(),
                currency: 'INR',
                customerName: `${firstName} ${lastName}`.trim(),
                customerEmail: email,
                items: items.map((item) => ({
                  id: item.product.id,
                  name: item.product.name,
                  quantity: item.quantity,
                  price: item.product.price,
                })),
              }),
            });

            let verifyData: any = null;
            try {
              verifyData = await verifyRes.json();
            } catch {
              verifyData = null;
            }

            if (verifyRes.ok && verifyData?.verified) {
              finalizeOrderSuccess(response.razorpay_order_id, {
                paymentId: response.razorpay_payment_id,
                amount: Number((order.amount / 100).toFixed(2)),
                currency: order.currency || 'INR',
              });
            } else {
              setErrorMessage(verifyData?.error || `Payment verification failed (${verifyRes.status})`);
              setIsProcessing(false);
            }
          } catch (err: any) {
            setErrorMessage(err?.message || 'Error verifying payment');
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpayCheckout = new window.Razorpay(options);
      razorpayCheckout.on('payment.failed', function (resp: any) {
        const desc = resp?.error?.description || resp?.error?.reason || 'Payment failed';
        setErrorMessage(desc);
        setIsProcessing(false);
      });
      razorpayCheckout.open();
    } catch (err: any) {
      console.error('Razorpay process error:', err);
      setErrorMessage(err?.message || 'Unable to start Razorpay checkout right now.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border border-brand-border rounded-3xl p-10 shadow-sm"
        >
          <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-text">
            <Download size={28} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-text uppercase mb-3">Your collection is empty</h2>
          <p className="text-brand-text-muted text-sm mb-8 leading-relaxed">
            Select high-resolution wallpapers, digital guides, or productivity systems to proceed with checkout.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="w-full py-4 bg-brand-text text-white font-sans text-xs font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-800 transition-all shadow-md"
          >
            Explore Digital Shop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-32 bg-transparent text-brand-text font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-brand-border pb-6 flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-accent bg-white/90 backdrop-blur-sm border border-brand-border px-3 py-1 rounded-full shadow-xs mb-3 inline-block">
              INSTANT DIGITAL CHECKOUT
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-tight text-brand-text">
              COMPLETE YOUR ORDER
            </h1>
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Checkout Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <form onSubmit={handleCompletePurchase} className="space-y-10">
              
              {/* Customer Info */}
              <section className="bg-white/85 backdrop-blur-md border border-brand-border rounded-3xl p-8 shadow-sm">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-text mb-6 pb-3 border-b border-brand-border flex items-center justify-between">
                  <span>1. Digital Delivery Details</span>
                  <span className="text-[10px] font-medium text-brand-text-muted font-sans lowercase">required</span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com (Where downloads will be sent)"
                      className="w-full bg-white border border-brand-border rounded-xl p-4 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors placeholder-neutral-400 font-sans shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Alex"
                        className="w-full bg-white border border-brand-border rounded-xl p-4 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors font-sans shadow-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Vance"
                        className="w-full bg-white border border-brand-border rounded-xl p-4 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors font-sans shadow-xs"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white/85 backdrop-blur-md border border-brand-border rounded-3xl p-8 shadow-sm">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-text mb-6 pb-3 border-b border-brand-border flex items-center justify-between">
                  <span>2. Payment Gateway</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Powered by Razorpay
                  </span>
                </h3>

                {errorMessage && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl mb-6 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="p-5 bg-gradient-to-br from-neutral-50 to-neutral-100/80 border border-brand-border rounded-2xl mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-text flex items-center gap-2">
                      <Smartphone size={16} className="text-brand-accent" />
                      Razorpay Checkout Gateway
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md uppercase">
                      Instant & Secured
                    </span>
                  </div>
                  <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
                    Pay securely using <strong>UPI (GPay, PhonePe, Paytm)</strong>, <strong>Credit/Debit Cards</strong>, <strong>Netbanking</strong>, or <strong>Wallets</strong> directly inside the official Razorpay popup.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-border/60">
                    <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mr-1">Supported Methods:</span>
                    <span className="text-[10px] font-bold bg-white border border-brand-border px-2.5 py-1 rounded-lg text-brand-text flex items-center gap-1">
                      <Smartphone size={12} className="text-purple-600" /> UPI / QR
                    </span>
                    <span className="text-[10px] font-bold bg-white border border-brand-border px-2.5 py-1 rounded-lg text-brand-text flex items-center gap-1">
                      <CreditCard size={12} className="text-blue-600" /> Visa / Mastercard / RuPay
                    </span>
                    <span className="text-[10px] font-bold bg-white border border-brand-border px-2.5 py-1 rounded-lg text-brand-text">
                      Netbanking
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                    Secure checkout powered by Razorpay. Once payment is completed, your order is verified on the backend and your digital assets are unlocked immediately.
                  </p>
                </div>
              </section>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 bg-brand-text text-white rounded-2xl font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Opening Razorpay Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Pay with Razorpay — ₹{getCartTotal().toFixed(2)}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-brand-text-muted font-medium pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" /> SSL Encrypted
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Download size={14} className="text-brand-text" /> Instant Asset Delivery
                </span>
              </div>
            </form>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[400px]"
          >
            <div className="bg-white/85 backdrop-blur-md border border-brand-border rounded-3xl p-8 sticky top-32 shadow-sm">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-text mb-6 border-b border-brand-border pb-4 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-[11px] font-semibold text-brand-text bg-brand-bg border border-brand-border px-2.5 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </h3>
              
              <div className="space-y-4 mb-8 max-h-[320px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-brand-bg rounded-2xl border border-brand-border">
                    <div className="w-16 aspect-[4/5] bg-white rounded-xl border border-brand-border overflow-hidden shrink-0">
                      <img src={item.product.heroImage} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-brand-text truncate">{item.product.name}</h4>
                      <p className="text-brand-text-muted text-xs uppercase tracking-wider font-semibold mt-0.5">{item.product.category}</p>
                      <p className="text-brand-text font-bold text-xs mt-1">₹{item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-brand-border mb-6">
                <div className="flex justify-between text-xs font-semibold text-brand-text-muted uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <span>Digital Delivery</span>
                  <span>Free / Instant</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-brand-border">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-text">Total</span>
                <span className="text-3xl font-serif font-bold text-brand-text">₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
