import { Router } from 'express';
import { Like } from 'typeorm';
import { ServiceCategory } from '../../common/enums';
import { AppDataSource } from '../../database/data-source';
import { Service } from '../../entities/service.entity';

export const servicesRouter = Router();

servicesRouter.get('/', async (req, res, next) => {
  try {
    const repo = AppDataSource.getRepository(Service);
    const { category, featured, q } = req.query;

    const where: Record<string, unknown>[] = [];
    const base: Record<string, unknown> = {};

    if (typeof category === 'string' && category) {
      base.category = category;
    }
    if (featured === 'true') base.featured = true;
    if (featured === 'false') base.featured = false;

    if (typeof q === 'string' && q.trim()) {
      where.push({ ...base, name: Like(`%${q.trim()}%`) });
      where.push({ ...base, shortDescription: Like(`%${q.trim()}%`) });
    } else {
      where.push(base);
    }

    const [data, total] = await repo.findAndCount({
      where,
      order: { featured: 'DESC', name: 'ASC' },
    });

    res.json({ data, meta: { total } });
  } catch (error) {
    next(error);
  }
});

servicesRouter.get('/categories', (_req, res) => {
  res.json({ data: Object.values(ServiceCategory) });
});

servicesRouter.get('/:slug', async (req, res, next) => {
  try {
    const service = await AppDataSource.getRepository(Service).findOne({
      where: { slug: req.params.slug },
    });
    if (!service) {
      res.status(404).json({
        data: null,
        error: { statusCode: 404, message: 'Servicio no encontrado' },
      });
      return;
    }
    res.json({ data: service });
  } catch (error) {
    next(error);
  }
});
