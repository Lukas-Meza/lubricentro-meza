import { useEffect, useMemo, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { ServiceCard } from '../components/ServiceCard';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { fetchServices } from '../services/catalog';
import type { ServiceCategory, WorkshopService } from '../types';
import { cn } from '../utils/format';

const filters: { id: ServiceCategory | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Todos' },
  { id: 'LUBRICACION', label: 'Lubricación' },
  { id: 'MANTENIMIENTO', label: 'Mantenimiento' },
  { id: 'NEUMATICOS', label: 'Neumáticos' },
  { id: 'DIAGNOSTICO', label: 'Diagnóstico' },
];

export function ServiciosPage() {
  const [services, setServices] = useState<WorkshopService[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('ALL');
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  const load = () => {
    setStatus('loading');
    fetchServices()
      .then((res) => {
        setServices(res.data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(
    () => (filter === 'ALL' ? services : services.filter((s) => s.category === filter)),
    [filter, services],
  );

  return (
    <>
      <PageHero
        kicker="SERVICIOS"
        title="Lubricación y nivel 2, hechos como corresponde."
        copy="Elige el servicio, agrégalo a la cotización y te confirmamos precio según tu vehículo."
      />
      <section className="container-page section-y-sm">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn('chip', filter === item.id && 'chip--active')}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-8">
          {status === 'loading' ? <LoadingState /> : null}
          {status === 'error' ? (
            <ErrorState message="No se pudieron cargar los servicios." onRetry={load} />
          ) : null}
          {status === 'ready' && visible.length === 0 ? (
            <EmptyState title="Sin resultados" copy="Prueba con otro filtro." />
          ) : null}
          {status === 'ready' ? (
            <div className="grid-cards grid-cards--3">
              {visible.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
