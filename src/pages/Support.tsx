import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  CheckCircle2, 
  Send
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'Downloads & Access',
    question: 'How do I access my digital downloads after purchase?',
    answer: 'Immediately upon completing checkout, you will receive an instant download link on the success page and a copy sent to your email address. You can download your high-resolution wallpapers, guides, or tracker files at any time.'
  },
  {
    id: '2',
    category: 'Downloads & Access',
    question: 'What formats are the files delivered in?',
    answer: 'Wallpapers are provided in pristine Ultra-HD (4K/8K) PNG & JPG formats optimized for desktop, mobile, and tablet displays. The 10 Lessons guide is delivered as a PDF, and the Life Tracker is delivered as an .xlsx file.'
  },
  {
    id: '3',
    category: 'License & Usage',
    question: 'Can I use NOVASIOR wallpapers across all my personal devices?',
    answer: 'Yes! Your license grants you unlimited personal usage across all your personal devices (Mac, PC, iPhone, Android, iPad, etc.). Commercial distribution or re-selling is strictly prohibited.'
  },
  {
    id: '4',
    category: 'Orders & Refunds',
    question: 'What is your refund policy?',
    answer: 'Due to the immediate digital delivery of our products, all sales are final. However, if you experience any technical issues with your file download, our support team will resolve it for you immediately.'
  },
  {
    id: '5',
    category: 'Support & Inquiries',
    question: 'How quickly does the support team respond?',
    answer: 'Our dedicated support team typically responds to all inquiries within 48 hours.'
  }
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<string | null>('1');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Support',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Order Number: ${formData.orderNumber || 'Not provided'}`,
      '',
      formData.message,
    ].join('\n');
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=novasior@gmail.com&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailComposeUrl, '_blank');
  };

  return (
    <div className="w-full bg-transparent text-brand-text min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-accent bg-white/90 backdrop-blur-sm border border-brand-border px-4 py-1.5 rounded-full shadow-sm">
              NOVASIOR HELP CENTER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-tight uppercase text-brand-text mb-6"
          >
            HOW CAN WE HELP YOU?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-brand-text-muted text-base md:text-lg font-normal leading-relaxed"
          >
            Find answers to common questions about downloads, licensing, and orders, or get in direct touch with our support team.
          </motion.p>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 bg-white/80 backdrop-blur-sm border border-brand-border rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-white/90 border border-brand-border rounded-xl mb-4 text-brand-text">
              <Download size={24} />
            </div>
            <h3 className="font-bold text-sm tracking-wide text-brand-text mb-2 uppercase">Instant Access</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              All digital files are available for download immediately upon order completion.
            </p>
          </div>

          <div className="p-6 bg-white/80 backdrop-blur-sm border border-brand-border rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-white/90 border border-brand-border rounded-xl mb-4 text-brand-text">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-sm tracking-wide text-brand-text mb-2 uppercase">48h Response Time</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              Our support team operates Monday through Friday to assist with any questions.
            </p>
          </div>

          <div className="p-6 bg-white/80 backdrop-blur-sm border border-brand-border rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-white/90 border border-brand-border rounded-xl mb-4 text-brand-text">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-sm tracking-wide text-brand-text mb-2 uppercase">Guaranteed Quality</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              High-resolution 4K/8K assets formatted perfectly for desktop and mobile displays.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="mb-8 border-b border-brand-border pb-4 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold tracking-wider uppercase text-brand-text flex items-center gap-3">
              <HelpCircle className="text-brand-accent" size={24} />
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white/80 backdrop-blur-sm border border-brand-border rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-brand-text hover:text-brand-accent transition-colors"
                  >
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`transform transition-transform duration-300 text-brand-text-muted ${isOpen ? 'rotate-180 text-brand-accent' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-brand-text-muted text-sm md:text-base leading-relaxed border-t border-brand-border/50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-brand-border rounded-3xl p-8 md:p-12 shadow-md">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-brand-bg rounded-full mb-4 text-brand-text">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wider text-brand-text mb-3">
                EMAIL SUPPORT
              </h2>
              <p className="text-brand-text-muted text-sm">
                Add your details and message below. The button will open a new email addressed to novasior@gmail.com.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-brand-bg border border-brand-border rounded-2xl text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-brand-text mb-2 uppercase">Email Draft Opened</h3>
                <p className="text-brand-text-muted text-sm mb-6">
                  Gmail opened in a new tab with your message addressed to <span className="font-semibold text-brand-text">novasior@gmail.com</span>. Press Send in Gmail to deliver it.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', orderNumber: '', subject: 'General Support', message: '' });
                  }}
                  className="px-6 py-2.5 bg-brand-text text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  Write Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. NOV-10928"
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors"
                    >
                      <option value="General Support">General Support</option>
                      <option value="Download Help">Download / Access Help</option>
                      <option value="License Question">License / Usage Rights</option>
                      <option value="Custom Order">Custom Design Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you..."
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-text transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-text text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Open Email</span>
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
