import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProduct } from '../services/catalog';
import type { Product } from '../types';
import { formatClp, cn } from '../utils/format';
import { useQuote } from '../hooks/useQuote';
import { ErrorState } from '../components/States';

// Ficha de producto: agregar a cotizacion o volver al catalogo
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
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <ErrorState message={error} />
        <Link to="/productos" className="link-amber mt-6 inline-block">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page animate-pulse py-16 sm:py-20">
        <div className="h-64 rounded-md bg-steel sm:h-80" />
      </div>
    );
  }

  const added = items.some((item) => item.id === product.id);
  const specs = product.specs ?? {};
  const isLubricant = product.category === 'LUBRICANTE';

  return (
    <article className="container-page detail-layout detail-layout--product section-y-sm">
      <div className={cn('media-frame', isLubricant ? 'bg-ink' : 'bg-white')}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={cn(
            'product-detail-media',
            isLubricant && 'product-detail-media--lubricant',
          )}
        />
      </div>
      <div>
        <p className="kicker-sm">{product.brand}</p>
        <h1 className="heading-product mt-2">{product.name}</h1>
        <p className="copy-muted mt-4">{product.description}</p>
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
        <p className="mt-8 font-display text-3xl font-bold sm:text-4xl">
          Desde {formatClp(product.priceFrom)}
        </p>
        <p className="mt-1 text-sm text-mist">
          {product.inStock
            ? 'Referencia con stock habitual. Confirmamos al cotizar.'
            : 'Consultar disponibilidad.'}
        </p>
        <div className="cta-row mt-6">
          <button
            type="button"
            onClick={() => addProduct(product)}
            className="btn btn-primary flex-1 sm:flex-none"
          >
            {added ? 'Ya está en tu cotización' : 'Agregar a cotización'}
          </button>
          <Link to="/cotizar" className="btn btn-outline flex-1 sm:flex-none">
            Ir a cotizar
          </Link>
        </div>
      </div>
    </article>
  );
}
