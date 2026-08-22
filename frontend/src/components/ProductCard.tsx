import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatClp } from '../utils/format';
import { useQuote } from '../hooks/useQuote';

const categoryLabel: Record<Product['category'], string> = {
  LUBRICANTE: 'Lubricante',
  FILTRO: 'Filtro',
  NEUMATICO: 'Neumático',
  REPUESTO: 'Repuesto',
  BATERIA: 'Batería',
};

export function ProductCard({ product }: { product: Product }) {
  const { addProduct, items } = useQuote();
  const added = items.some((item) => item.id === product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-steel">
      <Link to={`/productos/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-steel">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {!product.inStock ? (
          <span className="absolute right-3 top-3 rounded-sm bg-carbon px-2 py-1 text-[11px] uppercase tracking-wider text-mist">
            Consultar stock
          </span>
        ) : (
          <span className="absolute left-3 top-3 rounded-sm bg-carbon/80 px-2 py-1 text-[11px] uppercase tracking-wider text-amber">
            {categoryLabel[product.category]}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-mist">{product.brand}</p>
        <h3 className="mt-1 font-display text-xl font-bold uppercase leading-tight">
          <Link to={`/productos/${product.slug}`} className="hover:text-amber">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-mist">{product.shortDescription}</p>
        <p className="mt-3 text-sm font-semibold">Desde {formatClp(product.priceFrom)}</p>
        <div className="mt-3 flex gap-2">
          <Link
            to={`/productos/${product.slug}`}
            className="flex-1 rounded-sm border border-line px-3 py-2 text-center text-sm hover:border-amber/50"
          >
            Ver
          </Link>
          <button
            type="button"
            onClick={() => addProduct(product)}
            className="flex-1 rounded-sm bg-amber px-3 py-2 text-sm font-bold text-carbon hover:bg-amber-dim"
          >
            {added ? 'Agregado' : 'Cotizar'}
          </button>
        </div>
      </div>
    </article>
  );
}
