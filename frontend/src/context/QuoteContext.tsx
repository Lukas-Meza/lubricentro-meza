import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product, QuoteSelection, WorkshopService } from '../types';

// Persisto la cotizacion en localStorage para que no se pierda al refrescar
const STORAGE_KEY = 'lubricentro-meza-quote';

function readStored(): QuoteSelection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuoteSelection[]) : [];
  } catch {
    return [];
  }
}

interface QuoteContextValue {
  items: QuoteSelection[];
  count: number;
  addService: (service: WorkshopService) => void;
  addProduct: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteSelection[]>(() =>
    typeof window === 'undefined' ? [] : readStored(),
  );

  const persist = useCallback((next: QuoteSelection[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  // Si ya esta en la lista, solo subo la cantidad (tope 24)
  const addService = useCallback(
    (service: WorkshopService) => {
      const existing = items.find((item) => item.id === service.id);
      if (existing) {
        persist(
          items.map((item) =>
            item.id === service.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 24) }
              : item,
          ),
        );
        return;
      }
      persist([
        ...items,
        {
          kind: 'SERVICE',
          id: service.id,
          name: service.name,
          imageUrl: service.imageUrl,
          priceFrom: service.priceFrom,
          quantity: 1,
        },
      ]);
    },
    [items, persist],
  );

  const addProduct = useCallback(
    (product: Product) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        persist(
          items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 24) }
              : item,
          ),
        );
        return;
      }
      persist([
        ...items,
        {
          kind: 'PRODUCT',
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          priceFrom: product.priceFrom,
          quantity: 1,
        },
      ]);
    },
    [items, persist],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      persist(
        items
          .map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [items, persist],
  );

  const remove = useCallback(
    (id: string) => persist(items.filter((item) => item.id !== id)),
    [items, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      addService,
      addProduct,
      updateQuantity,
      remove,
      clear,
    }),
    [items, addService, addProduct, updateQuantity, remove, clear],
  );

  return createElement(QuoteContext.Provider, { value }, children);
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error('useQuote debe usarse dentro de QuoteProvider');
  }
  return ctx;
}
