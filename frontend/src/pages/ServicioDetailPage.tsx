import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Clock } from 'lucide-react';
import { fetchService } from '../services/catalog';
import type { WorkshopService } from '../types';
import { formatClp, formatDuration } from '../utils/format';
import { useQuote } from '../hooks/useQuote';
import { ErrorState } from '../components/States';

// Ficha de servicio: incluye, precio desde y boton para cotizar
export function ServicioDetailPage() {
  const { slug } = useParams();
  const { addService, items } = useQuote();
  const [service, setService] = useState<WorkshopService | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchService(slug)
      .then(setService)
      .catch(() => setError('Servicio no encontrado.'));
  }, [slug]);

  if (error) {
    return (
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <ErrorState message={error} />
        <Link to="/servicios" className="link-amber mt-6 inline-block">
          Volver a servicios
        </Link>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container-page animate-pulse py-16 sm:py-20">
        <div className="h-64 rounded-md bg-steel sm:h-80" />
      </div>
    );
  }

  const added = items.some((item) => item.id === service.id);

  return (
    <article>
      <div className="detail-hero">
        <img src={service.imageUrl} alt={service.name} />
        <div className="detail-hero__shade" />
        <div className="detail-hero__title container-page">
          <p className="kicker">{service.category}</p>
          <h1 className="heading-page mt-2 max-w-4xl">{service.name}</h1>
        </div>
      </div>
      <div className="container-page detail-layout section-y-sm">
        <div>
          <p className="copy-lead text-bone/90">{service.description}</p>
          <h2 className="heading-card mt-8 sm:mt-10">Incluye</h2>
          <ul className="mt-4 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-mist">
                <Check size={16} className="mt-0.5 shrink-0 text-amber" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="panel h-fit">
          <p className="text-sm text-mist">Desde</p>
          <p className="font-display text-3xl font-bold text-bone sm:text-4xl">
            {formatClp(service.priceFrom)}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-sm text-mist">
            <Clock size={14} /> {formatDuration(service.durationMin)}
          </p>
          <button
            type="button"
            onClick={() => addService(service)}
            className="btn btn-primary btn-block mt-6"
          >
            {added ? 'Ya está en tu cotización' : 'Agregar a cotización'}
          </button>
          <Link to="/cotizar" className="link-amber mt-3 block text-center">
            Ir a cotizar
          </Link>
        </aside>
      </div>
    </article>
  );
}
