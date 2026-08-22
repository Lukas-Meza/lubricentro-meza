export type ServiceCategory =
  | 'LUBRICACION'
  | 'MANTENIMIENTO'
  | 'NEUMATICOS'
  | 'DIAGNOSTICO';

export type ProductCategory =
  | 'LUBRICANTE'
  | 'FILTRO'
  | 'NEUMATICO'
  | 'REPUESTO'
  | 'BATERIA';

export interface WorkshopService {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  durationMin: number | null;
  priceFrom: number | null;
  category: ServiceCategory;
  featured: boolean;
  imageUrl: string;
  includes: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sku: string | null;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  priceFrom: number | null;
  inStock: boolean;
  featured: boolean;
  imageUrl: string;
  specs: Record<string, string> | null;
}

export interface SiteHours {
  day: string;
  label: string;
  open: string | null;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  region: string;
  mapsQuery: string;
  instagram: string;
  facebook: string;
  hours: SiteHours[];
}

export type QuoteItemKind = 'SERVICE' | 'PRODUCT';

export interface QuoteSelection {
  kind: QuoteItemKind;
  id: string;
  name: string;
  imageUrl: string;
  priceFrom: number | null;
  quantity: number;
}

export interface CreateQuotePayload {
  name: string;
  phone: string;
  email?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  message?: string;
  items: {
    kind: QuoteItemKind;
    serviceId?: string;
    productId?: string;
    quantity: number;
  }[];
}

export interface ApiList<T> {
  data: T[];
  meta?: { total: number };
}

export interface ApiItem<T> {
  data: T;
}
