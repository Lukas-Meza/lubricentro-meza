import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Clock } from 'lucide-react';
import { fetchService } from '../services/catalog';
import type { WorkshopService } from '../types';
import { formatClp, formatDuration } from '../utils/format';
import { useQuote } from '../hooks/useQuote';
import { ErrorState } from '../components/States';

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
      <div className="mx-auto max-w-3xl px-4 py-20">
        <ErrorState message={error} />
        <Link to="/servicios" className="mt-6 inline-block text-amber">
          Volver a servicios
        </Link>
      </div>
    );
  }

  if (!service) {
    return <div className="mx-auto max-w-6xl animate-pulse px-4 py-20"><div className="h-80 rounded-md bg-steel" /></div>;
  }

  const added = items.some((item) => item.id === service.id);

  return (
    <article>
      <div className="relative h-[42vh] min-h-[280px] overflow-hidden">
        <img src={service.imageUrl} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-carbon/20" />
        <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-display text-sm tracking-[0.28em] text-amber">{service.category}</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold uppercase">{service.name}</h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-lg leading-relaxed text-bone/90">{service.description}</p>
          <h2 className="mt-10 font-display text-2xl uppercase">Incluye</h2>
          <ul className="mt-4 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-mist">
                <Check size={16} className="mt-0.5 shrink-0 text-amber" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-md border border-line bg-steel p-6">
          <p className="text-sm text-mist">Desde</p>
          <p className="font-display text-4xl font-bold text-bone">{formatClp(service.priceFrom)}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-sm text-mist">
            <Clock size={14} /> {formatDuration(service.durationMin)}
          </p>
          <button
            type="button"
            onClick={() => addService(service)}
            className="mt-6 w-full rounded-sm bg-amber py-3 text-sm font-bold text-carbon hover:bg-amber-dim"
          >
            {added ? 'Ya está en tu cotización' : 'Agregar a cotización'}
          </button>
          <Link to="/cotizar" className="mt-3 block text-center text-sm text-amber hover:underline">
            Ir a cotizar
          </Link>
        </aside>
      </div>
    </article>
  );
}
