import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ServiceCategory } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { QueryServicesDto } from './dto/query-services.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryServicesDto) {
    const where: Prisma.ServiceWhereInput = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.q) {
      where.OR = [
        { name: { contains: query.q, mode: 'insensitive' } },
        { shortDescription: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      }),
      this.prisma.service.count({ where }),
    ]);

    return { data, meta: { total } };
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({ where: { slug } });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    return service;
  }

  categories(): ServiceCategory[] {
    return Object.values(ServiceCategory);
  }
}
