import { api } from './api';
import type { ApiItem, SiteInfo } from '../types';

// Datos publicos del taller (telefono, wsp, mapa, etc.)
export async function fetchSite(): Promise<SiteInfo> {
  const { data } = await api.get<ApiItem<SiteInfo>>('/site');
  return data.data;
}
