import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ProductCategory } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { QueryProductsDto } from './dto/query-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryProductsDto) {
    const where: Prisma.ProductWhereInput = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.inStock !== undefined) {
      where.inStock = query.inStock;
    }

    if (query.brand) {
      where.brand = { equals: query.brand, mode: 'insensitive' };
    }

    if (query.q) {
      where.OR = [
        { name: { contains: query.q, mode: 'insensitive' } },
        { brand: { contains: query.q, mode: 'insensitive' } },
        { shortDescription: { contains: query.q, mode: 'insensitive' } },
        { sku: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { category: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.product.count({ where }),
    ]);

    return { data, meta: { total } };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  categories(): ProductCategory[] {
    return Object.values(ProductCategory);
  }
}
