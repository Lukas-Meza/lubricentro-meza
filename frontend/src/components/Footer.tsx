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
      <div className="container-page footer-grid section-y-sm">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Taller de lubricación y mantenimiento de nivel 2. Aceite, filtros, neumáticos y
            repuestos, con informe claro y sin vueltas.
          </p>
        </div>

        <div>
          <p className="kicker-sm">Taller</p>
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
          <p className="kicker-sm">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-bone/85">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-amber" />
              <span>
                {site.address}, {site.city}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-amber" />
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-amber">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-amber" />
              <span>Lun–Vie {todayHours?.open}. Sáb 08:30 – 14:00</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="kicker-sm">WhatsApp</p>
          <p className="mt-4 text-sm text-mist">Respuesta en horario de taller.</p>
          <a
            href={whatsappUrl(site.whatsapp, `Hola ${site.name}, quiero agendar un servicio.`)}
            className="btn btn-amber-outline btn-sm mt-4"
            target="_blank"
            rel="noreferrer"
          >
            Escribir ahora
          </a>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-mist">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
