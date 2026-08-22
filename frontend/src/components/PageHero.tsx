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
    <section className="hero-page">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="container-page relative section-y-sm">
        <p className="kicker">{kicker}</p>
        <h1 className="heading-page mt-3 max-w-3xl">{title}</h1>
        <p className="copy-muted mt-5 max-w-xl">{copy}</p>
        <Link to="/cotizar" className="link-amber mt-8 inline-block">
          Ir a cotizar →
        </Link>
      </div>
    </section>
  );
}
