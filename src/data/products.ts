import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'a0000000-0000-4000-8000-000000000001',
    slug: 'motivational-wallpapers',
    name: 'Motivational Wallpapers',
    category: 'Digital Assets',
    price: 299.00,
    description: 'A premium, carefully curated collection of 25 exclusive motivational wallpapers designed for both Mobile (9:16) and Desktop/Ultra-Wide (16:9) displays. Extracted from our signature collection, each piece acts as a daily visual standard, keeping ambition, relentless discipline, and financial clarity present whenever you unlock your device. Features striking typography, dark luxury aesthetics, supercar and aviation imagery, classical statue art, and high-impact motivational anchors.',
    shortDescription: 'Keep your ambition in sight. 20+ Mobile & 5+ Desktop 8K wallpapers for the unrelenting.',
    heroImage: '/persist.png',
    galleryImages: [
      '/persist.png',
      '/original.png',
      '/dream.png',
      '/dubai.png',
      '/consistency.png'
    ],
    features: [
      '20 Exclusive Mobile Wallpapers ("PERSIST", "HABIBI", "INVICTUS", "FILTHY RICH", "CONSISTENCY", "MONEY TALKS", "THE ROTATIONS")',
      '5 Exclusive Desktop Wallpapers ("FOCUS", "THE RICH LIFE", "AGAINST ALL THE ODDS", "THAT GRIND NEVER STOPS", "TRUST YOUR VISION")',
      'Ultra High-Resolution 4K & 8K Crisp Formats',
      'Dark Luxury Minimalist Aesthetic',
      'Themes of Supercars, Private Jets, Architecture, Mindset & Wealth'
    ],
    benefits: [
      'Environment shapes behavior—upgrade your daily digital canvas instantly',
      'Constant subconscious reinforcement of your highest standards',
      'Ultra-sharp 8K resolution meticulously formatted for OLED displays'
    ],
    includedItems: [
      'Mobile Wallpaper Pack (20 High-Res PDF/JPEG Files)',
      'Desktop Wallpaper Pack (5 High-Res 16:9 4K Files)',
      'Instant One-Click Zip Download'
    ],
    faq: [
      { question: 'Are these compatible with all devices?', answer: 'Yes! The mobile wallpapers are tailored for modern smartphones (iPhone & Android OLEDs), while desktop wallpapers fit 1080p, 4K, 8K, and ultra-wide monitors.' },
      { question: 'What specific designs are included in the PDF?', answer: 'The collection includes "PERSIST", "ORIGINAL", "CONQUER", "HABIBI", "DREAM", "AURA", "INVICTUS", "CONSISTENCY", "LOGIC OVER EMOTION", "TALKS", "FILTHY RICH", "THE ROTATIONS", "DUBAI SUNSET", "PRIVATE TARMAC", "LAMBORGHINI", "INFINITY POOL", "FERRARI CLASS", "SF90 NIGHT", "BLUE MOON", "SAMURAI", plus 5 desktop wallpapers.' }
    ],
    tags: ['Aesthetic', 'Environment', 'Focus', 'Luxury', 'Motivation'],
    wallpapers: [
      { id: 'w-01', title: 'PERSIST', type: 'mobile', theme: 'Space & Ambition', subtitle: 'Crescent Moon & Cosmic Depth', image: '/persist.png' },
      { id: 'w-02', title: 'ORIGINAL', type: 'mobile', theme: 'Typography & Mindset', subtitle: 'Cyan to Magenta Spectrum Gradient', image: '/original.png' },
      { id: 'w-04', title: 'DREAM', type: 'mobile', theme: 'Aesthetic Glow', subtitle: 'Multicolor Mesh Gradient', image: '/dream.png' },
      { id: 'w-05', title: 'DUBAI SUNSET', type: 'mobile', theme: 'Luxury Travel', subtitle: 'Burj Al Arab Golden Hour View', image: '/dubai.png' },
      { id: 'w-06', title: 'CONSISTENCY', type: 'mobile', theme: 'Discipline & Fitness', subtitle: 'Push-Up Athletic Silhouette', image: '/consistency.png' },
      { id: 'w-08', title: 'GRIND', type: 'desktop', theme: 'Laptop Focus', subtitle: 'Modern Laptop Workspace', image: '/grind%20(laptop).png' },
      { id: 'w-09', title: 'VISION', type: 'desktop', theme: 'Clarity & Execution', subtitle: 'Laptop Screen Inspiration', image: '/vision%20(laptop).png' }
    ]
  },
  {
    id: 'a0000000-0000-4000-8000-000000000002',
    slug: 'life-tracker',
    name: 'Life Tracker',
    category: 'Tools',
    price: 499.00,
    description: 'A simple digital tracker designed to help you monitor your habits, goals, progress and the areas of life that matter most. It provides the framework to shift from chasing outcomes to actively measuring and managing your personal development and consistency.',
    shortDescription: 'See where you are. Build where you\'re going.',
    heroImage: '/Image 1(product2).png',
    galleryImages: [
      '/Image 1(product2).png',
      '/image 2 (product2).png'
    ],
    features: [
      'Habit Tracking Dashboard',
      'Goal Setting & Progress Monitoring',
      'Daily Life Tracking Areas',
      'Consistency Analytics',
      'Personal Development Logs'
    ],
    benefits: [
      'Visualize your daily progress and consistency',
      'Identify areas of life that need more attention',
      'Build unshakeable internal leverage through data'
    ],
    includedItems: [
      'Complete Digital Tracker',
      'Setup Guide & Walkthrough',
      'Example Dashboards'
    ],
    faq: [
      { question: 'Do I need specific software for this?', answer: 'The tracker is designed to be used with common spreadsheet tools or platforms like Notion, and comes with easy-to-use templates.' },
      { question: 'How much time does it take to use daily?', answer: 'It is designed for efficiency. Tracking your daily progress takes less than 5 minutes.' }
    ],
    tags: ['Tracking', 'Habits', 'Growth']
  },
  {
    id: 'a0000000-0000-4000-8000-000000000003',
    slug: '10-lessons',
    name: '10 Lessons to Help You Get Started',
    category: 'Guides',
    price: 799.00,
    description: 'Ten practical lessons designed to help you gain direction, build momentum and take the first real steps toward becoming the person you want to be. This digital guide focuses on getting started, mindset, discipline, taking action, and personal growth.',
    shortDescription: 'Stop waiting. Start becoming.',
    heroImage: '/cover image (product3).png',
    galleryImages: [
      '/cover image (product3).png',
      '/image 1 (product3).png',
      '/image 2 (product3).png'
    ],
    features: [
      '10 Core Lessons on Mindset & Action',
      'Practical Implementation Steps',
      'Momentum-Building Exercises',
      'Direction and Focus Frameworks',
      'Discipline Fundamentals'
    ],
    benefits: [
      'Overcome analysis paralysis and start executing',
      'Shift your mindset from waiting to doing',
      'Establish a foundation for long-term growth'
    ],
    includedItems: [
      '10 Lessons Digital Guide (PDF)'
    ],
    faq: [
      { question: 'Who is this guide for?', answer: 'It is for anyone who feels stuck, lacks direction, or struggles to take the first steps toward their goals.' },
      { question: 'How long are the lessons?', answer: 'Each lesson is concise and designed to be consumed and applied quickly, focusing on immediate action.' }
    ],
    tags: ['Mindset', 'Action', 'Discipline']
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
