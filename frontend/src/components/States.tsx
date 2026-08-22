export function LoadingState({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((key) => (
        <div key={key} className="h-72 animate-pulse rounded-md border border-line bg-steel" />
      ))}
      <p className="sr-only">{label}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-md border border-line bg-steel p-8 text-center">
      <p className="font-display text-2xl uppercase tracking-wide">No pudimos cargar esto</p>
      <p className="mt-2 text-sm text-mist">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-sm bg-amber px-4 py-2 text-sm font-bold text-carbon"
        >
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-md border border-dashed border-line bg-ink/50 p-10 text-center">
      <p className="font-display text-2xl uppercase">{title}</p>
      <p className="mt-2 text-sm text-mist">{copy}</p>
    </div>
  );
}
