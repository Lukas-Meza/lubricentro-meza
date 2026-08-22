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
const BAY = '/images/como-trabajamos.webp';

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
      <section className="hero-home">
        <img src={HERO} alt="Vehículo en bahía de servicio" className="hero-home__media img-ken" />
        <div className="hero-home__shade" />
        <div className="hero-home__content">
          <p className="kicker">Centro automotriz · {site.city}</p>
          <h1 className="heading-hero mt-4 max-w-3xl">
            El motor no espera. El mantenimiento, tampoco.
          </h1>
          <p className="copy-lead mt-5 max-w-lg">
            Lubricación, mantenimiento de nivel 2, neumáticos y repuestos. Informe claro, turno el
            mismo día y cotización por WhatsApp.
          </p>
          <div className="cta-row mt-8">
            <Link to="/cotizar" className="btn btn-primary">
              Cotizar servicio <ArrowRight size={16} />
            </Link>
            <Link to="/servicios" className="btn btn-ghost">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="container-page grid-highlights">
          {[
            { icon: Timer, label: 'Mismo día', copy: 'Turnos de lubricación con hora acordada.' },
            { icon: ShieldCheck, label: 'Nivel 2', copy: 'Paquete completo, no solo el aceite.' },
            { icon: Gauge, label: 'Marcas', copy: 'Lubricantes y gomas de primer nivel.' },
            { icon: Wrench, label: 'Informe', copy: 'Te decimos qué urge y qué puede esperar.' },
          ].map((item) => (
            <div key={item.label} className="highlight-item">
              <item.icon className="mt-0.5 shrink-0 text-amber" size={20} />
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-wide">{item.label}</p>
                <p className="mt-1 text-sm text-mist">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page section-y">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <SectionHeader
            kicker="SERVICIOS"
            title="Lo que hacemos en el foso"
            copy="Desde el cambio de aceite hasta el nivel 2 completo. Elige y arma tu cotización."
          />
          <Link to="/servicios" className="link-amber shrink-0">
            Todos los servicios →
          </Link>
        </div>
        <div className="mt-8 sm:mt-10">
          {status === 'loading' ? <LoadingState /> : null}
          {status === 'error' ? (
            <ErrorState message="Revisa que la API esté en marcha." onRetry={load} />
          ) : null}
          {status === 'ready' && services.length === 0 ? (
            <EmptyState title="Sin servicios" copy="Aún no hay servicios publicados." />
          ) : null}
          {status === 'ready' ? (
            <div className="grid-cards grid-cards--3">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="mx-auto max-w-6xl split-media">
          <div className="split-media__image">
            <img src={BAY} alt="Mecánico trabajando en el taller" />
          </div>
          <div className="split-media__content">
            <p className="kicker">Cómo trabajamos</p>
            <h2 className="heading-section mt-3">Tres pasos. Sin letra chica.</h2>
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

      <section className="container-page section-y">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <SectionHeader
            kicker="CATÁLOGO"
            title="Aceite, gomas y repuestos"
            copy="Precios referenciales. La cotización confirma medida, viscosidad y stock del día."
          />
          <Link to="/productos" className="link-amber shrink-0">
            Ver catálogo →
          </Link>
        </div>
        <div className="mt-8 sm:mt-10">
          {status === 'ready' ? (
            <div className="grid-cards grid-cards--4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-line bg-gradient-to-r from-ink to-steel">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center sm:py-16">
          <div className="max-w-2xl">
            <p className="kicker">¿Listo para entrar a bahía?</p>
            <h2 className="heading-section mt-2">Arma tu cotización en un minuto.</h2>
          </div>
          <div className="cta-row w-full sm:w-auto">
            <Link to="/cotizar" className="btn btn-primary flex-1 sm:flex-none">
              Cotizar
            </Link>
            <a
              href={whatsappUrl(site.whatsapp, `Hola ${site.name}, ¿tienen hora para hoy?`)}
              className="btn btn-amber-outline flex-1 sm:flex-none"
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
