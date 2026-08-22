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

// Catalogo de productos con filtro por categoria (client-side sobre el listado)
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
      <section className="container-page section-y-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn('chip', filter === item.id && 'chip--active')}
              >
                {item.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar marca o medida"
            className="field-input w-full lg:max-w-64"
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
            <div className="grid-cards grid-cards--3">
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
