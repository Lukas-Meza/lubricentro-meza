import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useQuote } from '../hooks/useQuote';
import { cn } from '../utils/format';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/productos', label: 'Productos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useQuote();
  const location = useLocation();

  // Fondo mas solido cuando scrolleas para que se lea bien el menu
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierro el menu mobile al navegar
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Evito scroll del body con el drawer abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'site-header',
        scrolled || open
          ? 'border-b border-line/80 bg-carbon/95 backdrop-blur-md'
          : 'border-b border-transparent bg-carbon/40 backdrop-blur-sm',
      )}
    >
      <div className="site-header__bar">
        <Logo />

        <nav className="nav-desktop" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => cn('nav-link', isActive && 'is-active')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink to="/cotizar" className="btn btn-primary btn-sm">
            Cotizar
            {count > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-carbon px-1 text-[11px] text-amber">
                {count}
              </span>
            ) : null}
          </NavLink>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="nav-mobile">
          <nav className="container-page flex flex-col py-4" aria-label="Móvil">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => cn('nav-mobile__link', isActive && 'is-active')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
