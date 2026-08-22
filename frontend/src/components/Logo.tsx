import { Link } from 'react-router-dom';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Lubricentro Meza — inicio">
      <span className="relative grid h-10 w-10 place-items-center rounded-md border border-amber/40 bg-ink shadow-[inset_0_0_0_1px_rgba(231,179,26,0.12)]">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path
            d="M16 5c.4 3.2 1.6 5.2 4 6.2-2.8.6-4.2 2.2-4.2 5.4 0 3.8 2.2 6.4 6.2 7.4C18.2 27.8 12 26.4 9.4 21.2 6.6 15.6 9.2 8.4 16 5Z"
            fill="#E7B31A"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[11px] font-semibold tracking-[0.28em] text-mist">
          LUBRICENTRO
        </span>
        <span className="block font-display text-[22px] font-extrabold tracking-[0.14em] text-bone group-hover:text-amber transition-colors">
          MEZA
        </span>
      </span>
      {compact ? null : (
        <span className="ml-1 hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
      )}
    </Link>
  );
}
