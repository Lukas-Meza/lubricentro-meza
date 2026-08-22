import { config as loadEnv } from 'dotenv';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

loadEnv();

function env(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

// Ruta absoluta al sqlite. Si la carpeta no existe, la creo.
const sqlitePath = resolve(
  process.cwd(),
  env('SQLITE_PATH', './data/lubricentro.sqlite'),
);
mkdirSync(dirname(sqlitePath), { recursive: true });

// Todo lo configurable del taller vive en .env (contacto, wsp, mapa, etc.)
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
    // Importante: WhatsApp sin + ni espacios, con codigo de pais (ej. 569...)
    whatsapp: env('SITE_WHATSAPP', '56971543327'),
    email: env('SITE_EMAIL', 'contacto@lubricentromeza.cl'),
    address: env('SITE_ADDRESS', 'Av. San Miguel 2450'),
    city: env('SITE_CITY', 'Talca'),
    region: env('SITE_REGION', 'Región del Maule'),
    // Este string es el que usa el iframe del mapa en Contacto
    mapsQuery: env(
      'SITE_MAPS_QUERY',
      'Av. San Miguel 2450, Talca, Región del Maule, Chile',
    ),
    instagram: env(
      'SITE_INSTAGRAM',
      'https://instagram.com/lubricentromeza',
    ),
    facebook: env('SITE_FACEBOOK', 'https://facebook.com/lubricentromeza'),
  },
};
