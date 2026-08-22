import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { QuoteItemKind } from '../../common/enums';
import { Product } from '../products/entities/product.entity';
import { Service } from '../services/entities/service.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteItem } from './entities/quote-item.entity';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotes: Repository<Quote>,
    @InjectRepository(QuoteItem)
    private readonly quoteItems: Repository<QuoteItem>,
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async create(dto: CreateQuoteDto) {
    const serviceIds = dto.items
      .filter((item) => item.kind === 'SERVICE' && item.serviceId)
      .map((item) => item.serviceId as string);

    const productIds = dto.items
      .filter((item) => item.kind === 'PRODUCT' && item.productId)
      .map((item) => item.productId as string);

    const [services, products] = await Promise.all([
      serviceIds.length
        ? this.services.find({ where: { id: In(serviceIds) } })
        : Promise.resolve([]),
      productIds.length
        ? this.products.find({ where: { id: In(productIds) } })
        : Promise.resolve([]),
    ]);

    if (services.length !== serviceIds.length) {
      throw new BadRequestException('Uno o más servicios no existen');
    }

    if (products.length !== productIds.length) {
      throw new BadRequestException('Uno o más productos no existen');
    }

    const quote = this.quotes.create({
      name: dto.name.trim(),
      phone: dto.phone.trim(),
      email: dto.email?.trim() || null,
      vehicleMake: dto.vehicleMake?.trim() || null,
      vehicleModel: dto.vehicleModel?.trim() || null,
      vehicleYear: dto.vehicleYear ?? null,
      message: dto.message?.trim() || null,
      items: dto.items.map((item) =>
        this.quoteItems.create({
          kind: item.kind as QuoteItemKind,
          serviceId: item.kind === 'SERVICE' ? (item.serviceId ?? null) : null,
          productId: item.kind === 'PRODUCT' ? (item.productId ?? null) : null,
          quantity: item.quantity,
        }),
      ),
    });

    const saved = await this.quotes.save(quote);

    return this.quotes.findOne({
      where: { id: saved.id },
      relations: { items: { service: true, product: true } },
    });
  }
}
