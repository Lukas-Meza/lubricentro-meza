import { config as loadEnv } from 'dotenv';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

loadEnv();

function env(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

const sqlitePath = resolve(
  process.cwd(),
  env('SQLITE_PATH', './data/lubricentro.sqlite'),
);
mkdirSync(dirname(sqlitePath), { recursive: true });

export const appConfig = {
  port: Number(env('PORT', '3000')),
  frontendUrl: env('FRONTEND_URL', 'http://127.0.0.1:5173'),
  sqlitePath,
  site: {
    name: env('SITE_NAME', 'Lubricentro Meza'),
    tagline: env(
      'SITE_TAGLINE',
      'Mantenimiento de nivel 2 con estándar de marca',
    ),
    phone: env('SITE_PHONE', '+56 9 7154 3327'),
    whatsapp: env('SITE_WHATSAPP', '56971543327'),
    email: env('SITE_EMAIL', 'contacto@lubricentromeza.cl'),
    address: env('SITE_ADDRESS', 'Av. Pajaritos 3450, Maipú'),
    city: env('SITE_CITY', 'Santiago'),
    region: env('SITE_REGION', 'Región Metropolitana'),
    mapsQuery: env(
      'SITE_MAPS_QUERY',
      'Av. Pajaritos 3450, Maipú, Santiago, Chile',
    ),
    instagram: env(
      'SITE_INSTAGRAM',
      'https://instagram.com/lubricentromeza',
    ),
    facebook: env('SITE_FACEBOOK', 'https://facebook.com/lubricentromeza'),
  },
};
