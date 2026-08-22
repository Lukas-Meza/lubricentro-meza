import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { QuoteItemKind } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuoteDto) {
    const serviceIds = dto.items
      .filter((item) => item.kind === 'SERVICE' && item.serviceId)
      .map((item) => item.serviceId as string);

    const productIds = dto.items
      .filter((item) => item.kind === 'PRODUCT' && item.productId)
      .map((item) => item.productId as string);

    const [services, products] = await Promise.all([
      serviceIds.length
        ? this.prisma.service.findMany({
            where: { id: { in: serviceIds } },
            select: { id: true },
          })
        : Promise.resolve([]),
      productIds.length
        ? this.prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true },
          })
        : Promise.resolve([]),
    ]);

    if (services.length !== serviceIds.length) {
      throw new BadRequestException('Uno o más servicios no existen');
    }

    if (products.length !== productIds.length) {
      throw new BadRequestException('Uno o más productos no existen');
    }

    const quote = await this.prisma.quote.create({
      data: {
        name: dto.name.trim(),
        phone: dto.phone.trim(),
        email: dto.email?.trim() || null,
        vehicleMake: dto.vehicleMake?.trim() || null,
        vehicleModel: dto.vehicleModel?.trim() || null,
        vehicleYear: dto.vehicleYear ?? null,
        message: dto.message?.trim() || null,
        items: {
          create: dto.items.map((item) => ({
            kind: item.kind as QuoteItemKind,
            serviceId: item.kind === 'SERVICE' ? item.serviceId : null,
            productId: item.kind === 'PRODUCT' ? item.productId : null,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            service: true,
            product: true,
          },
        },
      },
    });

    return quote;
  }
}
