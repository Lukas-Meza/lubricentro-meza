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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line/80 bg-carbon/95 backdrop-blur-md'
          : 'border-b border-transparent bg-carbon/40 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 text-sm font-medium tracking-wide transition-colors',
                  isActive ? 'text-amber' : 'text-bone/80 hover:text-bone',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/cotizar"
            className="inline-flex items-center gap-2 rounded-sm bg-amber px-4 py-2 text-sm font-bold tracking-wide text-carbon transition hover:bg-amber-dim"
          >
            Cotizar
            {count > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-carbon px-1 text-[11px] text-amber">
                {count}
              </span>
            ) : null}
          </NavLink>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-sm border border-line text-bone lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-ink lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4" aria-label="Móvil">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'border-b border-line/70 py-3 font-display text-2xl tracking-[0.12em]',
                    isActive ? 'text-amber' : 'text-bone',
                  )
                }
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
