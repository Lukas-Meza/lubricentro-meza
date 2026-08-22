export function SectionHeader({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-display text-sm font-semibold tracking-[0.28em] text-amber">{kicker}</p>
      <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-bone sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-3 text-mist">{copy}</p> : null}
    </div>
  );
}
