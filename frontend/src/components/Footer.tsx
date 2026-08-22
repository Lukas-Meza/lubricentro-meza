import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { useSite } from '../hooks/useSite';
import { whatsappUrl } from '../utils/whatsapp';

export function Footer() {
  const { site } = useSite();
  const todayHours = site.hours.find((h) => h.open);

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo compact />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Taller de lubricación y mantenimiento de nivel 2. Aceite, filtros, neumáticos y
            repuestos, con informe claro y sin vueltas.
          </p>
        </div>

        <div>
          <p className="font-display text-sm tracking-[0.2em] text-amber">TALLER</p>
          <ul className="mt-4 space-y-2 text-sm text-bone/85">
            <li>
              <Link to="/servicios" className="hover:text-amber">
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/productos" className="hover:text-amber">
                Productos y neumáticos
              </Link>
            </li>
            <li>
              <Link to="/cotizar" className="hover:text-amber">
                Solicitar cotización
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-amber">
                Quiénes somos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm tracking-[0.2em] text-amber">CONTACTO</p>
          <ul className="mt-4 space-y-3 text-sm text-bone/85">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-amber" />
              {site.address}, {site.city}
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-amber" />
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-amber">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-amber" />
              Lun–Vie {todayHours?.open}. Sáb 08:30 – 14:00
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm tracking-[0.2em] text-amber">WHATSAPP</p>
          <p className="mt-4 text-sm text-mist">Respuesta en horario de taller.</p>
          <a
            href={whatsappUrl(site.whatsapp, `Hola ${site.name}, quiero agendar un servicio.`)}
            className="mt-4 inline-flex rounded-sm border border-amber/40 px-4 py-2 text-sm font-semibold text-amber hover:bg-amber hover:text-carbon"
            target="_blank"
            rel="noreferrer"
          >
            Escribir ahora
          </a>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-mist">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
