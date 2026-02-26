import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PrintConfig {
  printType: 'bw' | 'color' | 'colorB' | 'colorC';
  paperType: 'a4' | 'a5' | 'a3';
  sided: 'single' | 'double';
  binding: 'none' | 'spiral' | 'staple' | 'tape';
  copies: number;
}

export interface CartItem {
  id: string;
  fileName: string;
  pageCount: number;
  config: PrintConfig;
  price: number;
  submissionMethod: 'telegram' | 'upload';
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: 'alphachap-cart',
    }
  )
);

// Price calculation helper
export const calculatePrice = (config: PrintConfig, pageCount: number): number => {
  const basePrices = {
    bw: 500,
    color: 3000,
    colorB: 2000,
    colorC: 1500,
  };

  const paperMultipliers = {
    a4: 1,
    a5: 0.6,
    a3: 2,
  };

  const sidedMultiplier = config.sided === 'double' ? 0.9 : 1;

  const bindingPrices = {
    none: 0,
    spiral: 15000,
    staple: 2000,
    tape: 8000,
  };

  const basePrice = basePrices[config.printType] * pageCount * paperMultipliers[config.paperType] * sidedMultiplier;
  const bindingPrice = bindingPrices[config.binding];
  
  return (basePrice + bindingPrice) * config.copies;
};
