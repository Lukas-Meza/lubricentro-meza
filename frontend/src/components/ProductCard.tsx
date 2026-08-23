import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatClp, cn } from '../utils/format';
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
  // Lubricantes y baterias: enteros sin zoom. El resto se recorta un poco.
  const fitContain =
    product.category === 'LUBRICANTE' || product.category === 'BATERIA';

  return (
    <article className="card group">
      <Link
        to={`/productos/${product.slug}`}
        className={cn(
          'card-media',
          fitContain ? 'card-media--lubricant' : 'card-media--product',
        )}
      >
        <img src={product.imageUrl} alt={product.name} className="card-img" />
        {!product.inStock ? (
          <span className="badge badge--right">Consultar stock</span>
        ) : (
          <span className="badge">{categoryLabel[product.category]}</span>
        )}
      </Link>
      <div className="card-body">
        <p className="text-xs uppercase tracking-[0.18em] text-mist">{product.brand}</p>
        <h3 className="heading-card mt-1 min-h-[2.5em]">
          <Link to={`/productos/${product.slug}`} className="hover:text-amber">
            {product.name}
          </Link>
        </h3>
        <p className="card-copy">{product.shortDescription}</p>
        <div className="card-footer">
          <p className="card-price">Desde {formatClp(product.priceFrom)}</p>
          <div className="card-actions">
            <Link to={`/productos/${product.slug}`} className="btn btn-outline btn-sm">
              Ver
            </Link>
            <button
              type="button"
              onClick={() => addProduct(product)}
              className="btn btn-primary btn-sm"
            >
              {added ? 'Agregado' : 'Cotizar'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
