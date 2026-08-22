import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type Weekday =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo';

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
  hours: { day: Weekday; label: string; open: string | null }[];
}

@Injectable()
export class SiteService {
  constructor(private readonly config: ConfigService) {}

  getInfo(): SiteInfo {
    return {
      name: this.config.get<string>('SITE_NAME', 'Lubricentro Meza'),
      tagline: this.config.get<string>(
        'SITE_TAGLINE',
        'Mantenimiento de nivel 2 con estándar de marca',
      ),
      phone: this.config.get<string>('SITE_PHONE', '+56 9 8765 4321'),
      whatsapp: this.config.get<string>('SITE_WHATSAPP', '56987654321'),
      email: this.config.get<string>(
        'SITE_EMAIL',
        'contacto@lubricentromeza.cl',
      ),
      address: this.config.get<string>(
        'SITE_ADDRESS',
        'Av. Pajaritos 3450, Maipú',
      ),
      city: this.config.get<string>('SITE_CITY', 'Santiago'),
      region: this.config.get<string>('SITE_REGION', 'Región Metropolitana'),
      mapsQuery: this.config.get<string>(
        'SITE_MAPS_QUERY',
        'Av. Pajaritos 3450, Maipú, Santiago, Chile',
      ),
      instagram: this.config.get<string>(
        'SITE_INSTAGRAM',
        'https://instagram.com/lubricentromeza',
      ),
      facebook: this.config.get<string>(
        'SITE_FACEBOOK',
        'https://facebook.com/lubricentromeza',
      ),
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
  }
}
