import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { WorkshopService } from '../types';
import { formatClp, formatDuration } from '../utils/format';
import { useQuote } from '../hooks/useQuote';

export function ServiceCard({ service }: { service: WorkshopService }) {
  const { addService, items } = useQuote();
  const added = items.some((item) => item.id === service.id);

  return (
    <article className="card group shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
      <Link to={`/servicios/${service.slug}`} className="card-media card-media--service">
        <img src={service.imageUrl} alt={service.name} className="card-img" />
        <span className="badge">{service.category.replace('_', ' ')}</span>
      </Link>
      <div className="card-body card-body--roomy">
        <h3 className="heading-card heading-card--service min-h-[2.5em]">
          <Link to={`/servicios/${service.slug}`} className="hover:text-amber">
            {service.name}
          </Link>
        </h3>
        <p className="card-copy">{service.shortDescription}</p>
        <div className="card-footer">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="card-price">Desde {formatClp(service.priceFrom)}</span>
            <span className="inline-flex items-center gap-1 text-mist">
              <Clock size={14} /> {formatDuration(service.durationMin)}
            </span>
          </div>
          <div className="card-actions">
            <Link to={`/servicios/${service.slug}`} className="btn btn-outline btn-sm">
              Ver detalle
            </Link>
            <button
              type="button"
              onClick={() => addService(service)}
              className="btn btn-primary btn-sm"
            >
              {added ? 'Agregado' : 'Cotizar'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
