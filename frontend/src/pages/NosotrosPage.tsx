import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

const TEAM = '/images/paginas/nosotros.png';

export function NosotrosPage() {
  return (
    <>
      <PageHero
        kicker="NOSOTROS"
        title="Un lubricentro que trata el auto como si fuera propio."
        copy="Meza nace como taller de barrio con disciplina de marca: ficha técnica, lubricante correcto y cero recargos sorpresa."
      />
      <section className="container-page grid gap-8 section-y lg:grid-cols-2 lg:gap-10">
        <div>
          <h2 className="heading-section text-[clamp(1.5rem,4vw,1.875rem)]">Por qué existimos</h2>
          <p className="copy-muted mt-4">
            Demasiados cambios de aceite se hacen “al ojo”. En Lubricentro Meza el punto de partida
            es la ficha del fabricante: viscosidad, especificación y kilometraje real. El nivel 2
            no es un paquete inflado: es aceite, filtros, fluidos y una revisión de 20 puntos con
            informe escrito.
          </p>
          <p className="copy-muted mt-4">
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
        <div className="media-frame">
          <img src={TEAM} alt="Equipo de Lubricentro Meza en el taller" />
        </div>
      </section>
      <section className="border-y border-line bg-ink">
        <div className="container-page section-y-sm">
          <p className="kicker">Compromiso</p>
          <h2 className="heading-section mt-2 max-w-2xl">
            Si no hay que hacerlo, no lo vendemos.
          </h2>
          <p className="copy-muted mt-4 max-w-xl">
            Preferimos que vuelvas en 10.000 km a que te lleves un recambio que el auto no pedía.
            Esa es la forma Meza de construir confianza.
          </p>
          <Link to="/cotizar" className="btn btn-primary mt-8">
            Cotizar un servicio
          </Link>
        </div>
      </section>
    </>
  );
}
