import { useEffect, useState } from 'react';
import { fetchSite } from '../services/site';
import type { SiteInfo } from '../types';

const fallback: SiteInfo = {
  name: 'Lubricentro Meza',
  tagline: 'Mantenimiento de nivel 2 con estándar de marca',
  phone: '+56 9 8765 4321',
  whatsapp: '56987654321',
  email: 'contacto@lubricentromeza.cl',
  address: 'Av. Pajaritos 3450, Maipú',
  city: 'Santiago',
  region: 'Región Metropolitana',
  mapsQuery: 'Av. Pajaritos 3450, Maipú, Santiago, Chile',
  instagram: 'https://instagram.com/lubricentromeza',
  facebook: 'https://facebook.com/lubricentromeza',
  hours: [
    { day: 'lunes', label: 'Lunes', open: '08:30 – 18:30' },
    { day: 'martes', label: 'Martes', open: '08:30 – 18:30' },
    { day: 'miercoles', label: 'Miércoles', open: '08:30 – 18:30' },
    { day: 'jueves', label: 'Jueves', open: '08:30 – 18:30' },
    { day: 'viernes', label: 'Viernes', open: '08:30 – 18:30' },
    { day: 'sabado', label: 'Sábado', open: '08:30 – 14:00' },
    { day: 'domingo', label: 'Domingo', open: null },
  ],
};

export function useSite() {
  const [site, setSite] = useState<SiteInfo>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSite()
      .then((info) => {
        if (!cancelled) setSite(info);
      })
      .catch(() => {
        if (!cancelled) setError('No pudimos cargar los datos de contacto.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { site, loading, error };
}
