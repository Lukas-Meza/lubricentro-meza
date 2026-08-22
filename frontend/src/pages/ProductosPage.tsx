import { useEffect, useMemo, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { EmptyState, ErrorState, LoadingState } from '../components/States';
import { fetchProducts } from '../services/catalog';
import type { Product, ProductCategory } from '../types';
import { cn } from '../utils/format';

const filters: { id: ProductCategory | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'Todos' },
  { id: 'LUBRICANTE', label: 'Lubricantes' },
  { id: 'NEUMATICO', label: 'Neumáticos' },
  { id: 'FILTRO', label: 'Filtros' },
  { id: 'REPUESTO', label: 'Repuestos' },
  { id: 'BATERIA', label: 'Baterías' },
];

export function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('ALL');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  const load = () => {
    setStatus('loading');
    fetchProducts()
      .then((res) => {
        setProducts(res.data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const catOk = filter === 'ALL' || product.category === filter;
      const qOk =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [filter, products, query]);

  return (
    <>
      <PageHero
        kicker="PRODUCTOS"
        title="Neumáticos, lubricantes y recambio."
        copy="Catálogo para cotizar. Confirmamos medida, viscosidad y stock antes de agendar."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  'rounded-sm border px-3 py-1.5 text-sm',
                  filter === item.id
                    ? 'border-amber bg-amber text-carbon'
                    : 'border-line text-mist hover:text-bone',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar marca o medida"
            className="w-full rounded-sm border border-line bg-ink px-3 py-2 text-sm outline-none placeholder:text-mist/60 focus:border-amber sm:w-64"
          />
        </div>
        <div className="mt-8">
          {status === 'loading' ? <LoadingState /> : null}
          {status === 'error' ? (
            <ErrorState message="No se pudieron cargar los productos." onRetry={load} />
          ) : null}
          {status === 'ready' && visible.length === 0 ? (
            <EmptyState
              title="Sin coincidencias"
              copy="Prueba otra categoría o escribe la medida del neumático."
            />
          ) : null}
          {status === 'ready' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
