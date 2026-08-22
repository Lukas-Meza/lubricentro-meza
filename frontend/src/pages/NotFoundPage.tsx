import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-display text-sm tracking-[0.28em] text-amber">404</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase">Página no encontrada</h1>
      <p className="mt-3 text-mist">Ese enlace no existe. Vuelve al taller.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-sm bg-amber px-5 py-3 text-sm font-bold text-carbon"
      >
        Ir al inicio
      </Link>
    </section>
  );
}
