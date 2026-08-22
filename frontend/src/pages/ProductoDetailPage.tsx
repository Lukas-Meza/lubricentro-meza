import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProduct } from '../services/catalog';
import type { Product } from '../types';
import { formatClp } from '../utils/format';
import { useQuote } from '../hooks/useQuote';
import { ErrorState } from '../components/States';

export function ProductoDetailPage() {
  const { slug } = useParams();
  const { addProduct, items } = useQuote();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchProduct(slug)
      .then(setProduct)
      .catch(() => setError('Producto no encontrado.'));
  }, [slug]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <ErrorState message={error} />
        <Link to="/productos" className="mt-6 inline-block text-amber">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-20">
        <div className="h-80 rounded-md bg-steel" />
      </div>
    );
  }

  const added = items.some((item) => item.id === product.id);
  const specs = product.specs ?? {};

  return (
    <article className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-md border border-line bg-steel">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-[4/3] h-auto w-full object-cover"
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-amber">{product.brand}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none">
          {product.name}
        </h1>
        <p className="mt-4 text-mist">{product.description}</p>
        {Object.keys(specs).length > 0 ? (
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="rounded-sm border border-line bg-steel px-3 py-2">
                <dt className="text-mist capitalize">{key}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <p className="mt-8 font-display text-4xl font-bold">Desde {formatClp(product.priceFrom)}</p>
        <p className="mt-1 text-sm text-mist">
          {product.inStock ? 'Referencia con stock habitual. Confirmamos al cotizar.' : 'Consultar disponibilidad.'}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => addProduct(product)}
            className="rounded-sm bg-amber px-5 py-3 text-sm font-bold text-carbon hover:bg-amber-dim"
          >
            {added ? 'Ya está en tu cotización' : 'Agregar a cotización'}
          </button>
          <Link to="/cotizar" className="rounded-sm border border-line px-5 py-3 text-sm hover:border-amber/50">
            Ir a cotizar
          </Link>
        </div>
      </div>
    </article>
  );
}
