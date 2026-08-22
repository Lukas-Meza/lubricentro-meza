import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

const TEAM =
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80';
const SHOP =
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80';

export function NosotrosPage() {
  return (
    <>
      <PageHero
        kicker="NOSOTROS"
        title="Un lubricentro que trata el auto como si fuera propio."
        copy="Meza nace como taller de barrio con disciplina de marca: ficha técnica, lubricante correcto y cero recargos sorpresa."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase">Por qué existimos</h2>
          <p className="mt-4 leading-relaxed text-mist">
            Demasiados cambios de aceite se hacen “al ojo”. En Lubricentro Meza el punto de partida
            es la ficha del fabricante: viscosidad, especificación y kilometraje real. El nivel 2
            no es un paquete inflado: es aceite, filtros, fluidos y una revisión de 20 puntos con
            informe escrito.
          </p>
          <p className="mt-4 leading-relaxed text-mist">
            Vendemos neumáticos y recambio porque el auto no se cuida por partes. Si hay que
            cambiar pastillas o una batería, lo cotizamos con marca reconocida y te decimos si
            puede esperar.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              'Lubricantes sintéticos de primer nivel',
              'Neumáticos Michelin, Bridgestone, Continental, Pirelli y Goodyear',
              'Bahía con hora acordada, no fila eterna',
              'WhatsApp directo con el taller, no un bot',
            ].map((item) => (
              <li key={item} className="border-l-2 border-amber pl-3 text-bone/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4">
          <img src={TEAM} alt="Detalle de motor en el taller" className="h-56 w-full rounded-md object-cover" />
          <img src={SHOP} alt="Técnico en bahía de servicio" className="h-56 w-full rounded-md object-cover" />
        </div>
      </section>
      <section className="border-y border-line bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="font-display text-sm tracking-[0.28em] text-amber">COMPROMISO</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl font-bold uppercase">
            Si no hay que hacerlo, no lo vendemos.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Preferimos que vuelvas en 10.000 km a que te lleves un recambio que el auto no pedía.
            Esa es la forma Meza de construir confianza.
          </p>
          <Link
            to="/cotizar"
            className="mt-8 inline-flex rounded-sm bg-amber px-5 py-3 text-sm font-bold text-carbon"
          >
            Cotizar un servicio
          </Link>
        </div>
      </section>
    </>
  );
}
