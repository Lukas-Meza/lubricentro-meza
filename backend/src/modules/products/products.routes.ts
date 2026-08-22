import { Router } from 'express';
import { Like } from 'typeorm';
import { ProductCategory } from '../../common/enums';
import { AppDataSource } from '../../database/data-source';
import { Product } from '../../entities/product.entity';

export const productsRouter = Router();

// Misma idea que servicios: filtros por categoria, stock, marca y texto libre
productsRouter.get('/', async (req, res, next) => {
  try {
    const repo = AppDataSource.getRepository(Product);
    const { category, featured, inStock, q, brand } = req.query;

    const where: Record<string, unknown>[] = [];
    const base: Record<string, unknown> = {};

    if (typeof category === 'string' && category) {
      base.category = category;
    }
    if (featured === 'true') base.featured = true;
    if (featured === 'false') base.featured = false;
    if (inStock === 'true') base.inStock = true;
    if (inStock === 'false') base.inStock = false;
    if (typeof brand === 'string' && brand) {
      base.brand = Like(brand);
    }

    if (typeof q === 'string' && q.trim()) {
      const term = `%${q.trim()}%`;
      where.push({ ...base, name: Like(term) });
      where.push({ ...base, brand: Like(term) });
      where.push({ ...base, shortDescription: Like(term) });
      where.push({ ...base, sku: Like(term) });
    } else {
      where.push(base);
    }

    const [data, total] = await repo.findAndCount({
      where,
      order: { featured: 'DESC', category: 'ASC', name: 'ASC' },
    });

    res.json({ data, meta: { total } });
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/categories', (_req, res) => {
  res.json({ data: Object.values(ProductCategory) });
});

// Detalle por slug
productsRouter.get('/:slug', async (req, res, next) => {
  try {
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { slug: req.params.slug },
    });
    if (!product) {
      res.status(404).json({
        data: null,
        error: { statusCode: 404, message: 'Producto no encontrado' },
      });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});
