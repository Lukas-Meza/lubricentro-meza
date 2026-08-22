import { api } from './api';
import type { ApiItem, CreateQuotePayload } from '../types';

// Endpoint opcional: el flujo principal de cotizar va por WhatsApp
export async function submitQuote(payload: CreateQuotePayload): Promise<{ id: string }> {
  const { data } = await api.post<ApiItem<{ id: string }>>('/quotes', payload);
  return data.data;
}
