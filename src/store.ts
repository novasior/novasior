import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './types';
import { products } from './data/products';

interface CartItem {
  product: Product;
  quantity: number; // usually 1 for digital products
}

export interface DownloadLink {
  productId: string;
  productName: string;
  url: string;
  expiresAt: string;
}

interface OrderInfo {
  id: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  items: CartItem[];
  total: number;
  email: string;
  name: string;
  date: string;
  status?: string;
  downloadLinks?: DownloadLink[];
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  lastOrder: OrderInfo | null;
  addItem: (product: Product) => void;
  buyNow: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getCartTotal: () => number;
  setLastOrder: (order: OrderInfo) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastOrder: null,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            return { isOpen: true };
          }
          return { items: [...state.items, { product, quantity: 1 }], isOpen: true };
        });
      },
      buyNow: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            return { isOpen: false };
          }
          return { items: [...state.items, { product, quantity: 1 }], isOpen: false };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      clearCart: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      setLastOrder: (order) => set({ lastOrder: order }),
    }),
    {
      name: 'novasior-cart',
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<CartStore>;
        const items = persisted.items?.map((item) => {
          const currentProduct = products.find((product) => product.id === item.product.id);
          return currentProduct ? { ...item, product: currentProduct } : item;
        });

        return {
          ...currentState,
          ...persisted,
          items: items ?? currentState.items,
        };
      },
    }
  )
);
