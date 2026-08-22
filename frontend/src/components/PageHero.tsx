import { Link } from 'react-router-dom';

export function PageHero({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-display text-sm font-semibold tracking-[0.28em] text-amber">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-wide text-bone sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-mist">{copy}</p>
        <Link to="/cotizar" className="mt-8 inline-block text-sm font-semibold text-amber hover:underline">
          Ir a cotizar →
        </Link>
      </div>
    </section>
  );
}
