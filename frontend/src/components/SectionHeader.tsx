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
      <p className="kicker">{kicker}</p>
      <h2 className="heading-section mt-2">{title}</h2>
      {copy ? <p className="copy-muted mt-3">{copy}</p> : null}
    </div>
  );
}
