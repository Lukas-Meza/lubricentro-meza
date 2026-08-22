import { api } from './api';
import type { ApiItem, ApiList, Product, WorkshopService } from '../types';

// Llamadas al catalogo: listados con filtros y detalle por slug
export async function fetchServices(params?: {
  featured?: boolean;
  category?: string;
  q?: string;
}): Promise<ApiList<WorkshopService>> {
  const { data } = await api.get<ApiList<WorkshopService>>('/services', {
    params,
  });
  return data;
}

export async function fetchService(slug: string): Promise<WorkshopService> {
  const { data } = await api.get<ApiItem<WorkshopService>>(`/services/${slug}`);
  return data.data;
}

export async function fetchProducts(params?: {
  featured?: boolean;
  category?: string;
  q?: string;
}): Promise<ApiList<Product>> {
  const { data } = await api.get<ApiList<Product>>('/products', { params });
  return data;
}

export async function fetchProduct(slug: string): Promise<Product> {
  const { data } = await api.get<ApiItem<Product>>(`/products/${slug}`);
  return data.data;
}
