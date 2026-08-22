import { Router } from 'express';
import { In } from 'typeorm';
import { z } from 'zod';
import { QuoteItemKind } from '../../common/enums';
import { AppDataSource } from '../../database/data-source';
import { Product } from '../../entities/product.entity';
import { QuoteItem } from '../../entities/quote-item.entity';
import { Quote } from '../../entities/quote.entity';
import { Service } from '../../entities/service.entity';

export const quotesRouter = Router();

// Validacion de lo que llega del formulario / front
const quoteSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().or(z.literal('')),
  vehicleMake: z.string().max(40).optional(),
  vehicleModel: z.string().max(40).optional(),
  vehicleYear: z.coerce.number().int().min(1985).max(new Date().getFullYear() + 1).optional(),
  message: z.string().max(800).optional(),
  items: z
    .array(
      z.object({
        kind: z.enum(['SERVICE', 'PRODUCT']),
        serviceId: z.string().uuid().optional(),
        productId: z.string().uuid().optional(),
        quantity: z.coerce.number().int().min(1).max(24),
      }),
    )
    .min(1),
});

// Guarda la cotizacion en SQLite. El flujo principal del sitio igual manda por WhatsApp.
quotesRouter.post('/', async (req, res, next) => {
  try {
    const parsed = quoteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        data: null,
        error: {
          statusCode: 400,
          message: parsed.error.issues.map((i) => i.message),
        },
      });
      return;
    }

    const dto = parsed.data;
    // Cargo los items reales desde DB para no confiar en precios que mande el cliente
    const serviceIds = dto.items
      .filter((item) => item.kind === 'SERVICE' && item.serviceId)
      .map((item) => item.serviceId as string);
    const productIds = dto.items
      .filter((item) => item.kind === 'PRODUCT' && item.productId)
      .map((item) => item.productId as string);

    const serviceRepo = AppDataSource.getRepository(Service);
    const productRepo = AppDataSource.getRepository(Product);
    const quoteRepo = AppDataSource.getRepository(Quote);
    const itemRepo = AppDataSource.getRepository(QuoteItem);

    const [services, products] = await Promise.all([
      serviceIds.length
        ? serviceRepo.find({ where: { id: In(serviceIds) } })
        : Promise.resolve([]),
      productIds.length
        ? productRepo.find({ where: { id: In(productIds) } })
        : Promise.resolve([]),
    ]);

    if (services.length !== serviceIds.length) {
      res.status(400).json({
        data: null,
        error: { statusCode: 400, message: 'Uno o más servicios no existen' },
      });
      return;
    }

    if (products.length !== productIds.length) {
      res.status(400).json({
        data: null,
        error: { statusCode: 400, message: 'Uno o más productos no existen' },
      });
      return;
    }

    const quote = quoteRepo.create({
      name: dto.name.trim(),
      phone: dto.phone.trim(),
      email: dto.email?.trim() || null,
      vehicleMake: dto.vehicleMake?.trim() || null,
      vehicleModel: dto.vehicleModel?.trim() || null,
      vehicleYear: dto.vehicleYear ?? null,
      message: dto.message?.trim() || null,
      items: dto.items.map((item) =>
        itemRepo.create({
          kind: item.kind as QuoteItemKind,
          serviceId: item.kind === 'SERVICE' ? (item.serviceId ?? null) : null,
          productId: item.kind === 'PRODUCT' ? (item.productId ?? null) : null,
          quantity: item.quantity,
        }),
      ),
    });

    const saved = await quoteRepo.save(quote);
    const full = await quoteRepo.findOne({
      where: { id: saved.id },
      relations: { items: { service: true, product: true } },
    });

    res.status(201).json({ data: full });
  } catch (error) {
    next(error);
  }
});
