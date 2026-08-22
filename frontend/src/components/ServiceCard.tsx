import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { WorkshopService } from '../types';
import { formatClp, formatDuration } from '../utils/format';
import { useQuote } from '../hooks/useQuote';

export function ServiceCard({ service }: { service: WorkshopService }) {
  const { addService, items } = useQuote();
  const added = items.some((item) => item.id === service.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-steel shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
      <Link to={`/servicios/${service.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={service.imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-carbon/80 px-2 py-1 font-display text-[11px] tracking-[0.18em] text-amber">
          {service.category.replace('_', ' ')}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
          <Link to={`/servicios/${service.slug}`} className="hover:text-amber">
            {service.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-mist">
          {service.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-bone">Desde {formatClp(service.priceFrom)}</span>
          <span className="inline-flex items-center gap-1 text-mist">
            <Clock size={14} /> {formatDuration(service.durationMin)}
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/servicios/${service.slug}`}
            className="flex-1 rounded-sm border border-line px-3 py-2 text-center text-sm hover:border-amber/50"
          >
            Ver detalle
          </Link>
          <button
            type="button"
            onClick={() => addService(service)}
            className="flex-1 rounded-sm bg-amber px-3 py-2 text-sm font-bold text-carbon hover:bg-amber-dim"
          >
            {added ? 'Agregado' : 'Cotizar'}
          </button>
        </div>
      </div>
    </article>
  );
}
