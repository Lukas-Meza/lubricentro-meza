import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useSite } from '../hooks/useSite';
import { whatsappUrl } from '../utils/whatsapp';

export function ContactoPage() {
  const { site } = useSite();
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <PageHero
        kicker="CONTACTO"
        title="Pasa al taller o escríbenos ahora."
        copy="Maipú, Santiago. WhatsApp es el canal más rápido para cotizar y agendar."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-md border border-line bg-steel p-5">
            <p className="flex items-center gap-2 font-display text-lg uppercase">
              <MapPin size={16} className="text-amber" /> Dirección
            </p>
            <p className="mt-2 text-mist">
              {site.address}
              <br />
              {site.city}, {site.region}
            </p>
          </div>
          <div className="rounded-md border border-line bg-steel p-5">
            <p className="flex items-center gap-2 font-display text-lg uppercase">
              <Phone size={16} className="text-amber" /> Teléfono y WhatsApp
            </p>
            <p className="mt-2">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-amber">
                {site.phone}
              </a>
            </p>
            <a
              href={whatsappUrl(site.whatsapp, `Hola ${site.name}, quiero cotizar.`)}
              className="mt-3 inline-flex rounded-sm bg-amber px-4 py-2 text-sm font-bold text-carbon"
              target="_blank"
              rel="noreferrer"
            >
              Abrir WhatsApp
            </a>
          </div>
          <div className="rounded-md border border-line bg-steel p-5">
            <p className="flex items-center gap-2 font-display text-lg uppercase">
              <Mail size={16} className="text-amber" /> Correo
            </p>
            <a href={`mailto:${site.email}`} className="mt-2 block hover:text-amber">
              {site.email}
            </a>
          </div>
          <div className="rounded-md border border-line bg-steel p-5">
            <p className="flex items-center gap-2 font-display text-lg uppercase">
              <Clock size={16} className="text-amber" /> Horario
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {site.hours.map((row) => (
                <li key={row.day} className="flex justify-between border-b border-line/60 py-1">
                  <span>{row.label}</span>
                  <span className={row.open ? 'text-bone' : 'text-mist'}>{row.open ?? 'Cerrado'}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="min-h-[360px] overflow-hidden rounded-md border border-line">
          <iframe
            title="Mapa Lubricentro Meza"
            src={mapsSrc}
            className="h-full min-h-[360px] w-full grayscale-[0.35] contrast-125"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
