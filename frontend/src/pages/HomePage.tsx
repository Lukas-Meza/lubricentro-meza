import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, ShieldCheck, Timer, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ServiceCard } from '../components/ServiceCard';
import { ProductCard } from '../components/ProductCard';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { fetchProducts, fetchServices } from '../services/catalog';
import type { Product, WorkshopService } from '../types';
import { useSite } from '../hooks/useSite';
import { whatsappUrl } from '../utils/whatsapp';

const HERO =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80';
const BAY =
  'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1600&q=80';

export function HomePage() {
  const { site } = useSite();
  const [services, setServices] = useState<WorkshopService[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  const load = () => {
    setStatus('loading');
    Promise.all([
      fetchServices({ featured: true }),
      fetchProducts({ featured: true }),
    ])
      .then(([svc, prod]) => {
        setServices(svc.data);
        setProducts(prod.data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={HERO}
          alt="Vehículo en bahía de servicio"
          className="img-ken absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/80 to-carbon/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/40" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-amber">
            CENTRO AUTOMOTRIZ · {site.city.toUpperCase()}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-wide text-bone sm:text-7xl">
            El motor no espera. El mantenimiento, tampoco.
          </h1>
          <p className="mt-5 max-w-lg text-base text-bone/80 sm:text-lg">
            Lubricación, mantenimiento de nivel 2, neumáticos y repuestos. Informe claro, turno el
            mismo día y cotización por WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cotizar"
              className="inline-flex items-center gap-2 rounded-sm bg-amber px-6 py-3 text-sm font-bold tracking-wide text-carbon hover:bg-amber-dim"
            >
              Cotizar servicio <ArrowRight size={16} />
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 rounded-sm border border-bone/25 px-6 py-3 text-sm font-semibold text-bone hover:border-amber/60"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="mx-auto grid max-w-6xl gap-px bg-line sm:grid-cols-4">
          {[
            { icon: Timer, label: 'Mismo día', copy: 'Turnos de lubricación con hora acordada.' },
            { icon: ShieldCheck, label: 'Nivel 2', copy: 'Paquete completo, no solo el aceite.' },
            { icon: Gauge, label: 'Marcas', copy: 'Lubricantes y gomas de primer nivel.' },
            { icon: Wrench, label: 'Informe', copy: 'Te decimos qué urge y qué puede esperar.' },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 bg-ink px-6 py-7">
              <item.icon className="mt-0.5 shrink-0 text-amber" size={20} />
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-wide">{item.label}</p>
                <p className="mt-1 text-sm text-mist">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            kicker="SERVICIOS"
            title="Lo que hacemos en el foso"
            copy="Desde el cambio de aceite hasta el nivel 2 completo. Elige y arma tu cotización."
          />
          <Link to="/servicios" className="text-sm font-semibold text-amber hover:underline">
            Todos los servicios →
          </Link>
        </div>
        <div className="mt-10">
          {status === 'loading' ? <LoadingState /> : null}
          {status === 'error' ? (
            <ErrorState message="Revisa que la API esté en marcha." onRetry={load} />
          ) : null}
          {status === 'ready' && services.length === 0 ? (
            <EmptyState title="Sin servicios" copy="Aún no hay servicios publicados." />
          ) : null}
          {status === 'ready' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="mx-auto grid max-w-6xl items-stretch md:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden">
            <img src={BAY} alt="Mecánico trabajando en el taller" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
            <p className="font-display text-sm tracking-[0.28em] text-amber">CÓMO TRABAJAMOS</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-none">
              Tres pasos. Sin letra chica.
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                ['01', 'Cotizas', 'Eliges servicio o producto y nos llega por el sitio o WhatsApp.'],
                ['02', 'Agendamos', 'Confirmamos hora, aceite y medidas. El auto entra a bahía.'],
                ['03', 'Entregamos', 'Te mostramos el informe. Pagas lo cotizado, nada más.'],
              ].map(([n, t, c]) => (
                <li key={n} className="flex gap-4">
                  <span className="font-display text-2xl text-amber">{n}</span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-mist">{c}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            kicker="CATÁLOGO"
            title="Aceite, gomas y repuestos"
            copy="Precios referenciales. La cotización confirma medida, viscosidad y stock del día."
          />
          <Link to="/productos" className="text-sm font-semibold text-amber hover:underline">
            Ver catálogo →
          </Link>
        </div>
        <div className="mt-10">
          {status === 'ready' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-line bg-gradient-to-r from-ink to-steel">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-display text-sm tracking-[0.28em] text-amber">¿LISTO PARA ENTRAR A BAHÍA?</p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase">Arma tu cotización en un minuto.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cotizar"
              className="rounded-sm bg-amber px-5 py-3 text-sm font-bold text-carbon hover:bg-amber-dim"
            >
              Cotizar
            </Link>
            <a
              href={whatsappUrl(site.whatsapp, `Hola ${site.name}, ¿tienen hora para hoy?`)}
              className="rounded-sm border border-amber/50 px-5 py-3 text-sm font-semibold text-amber"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
