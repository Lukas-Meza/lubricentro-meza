import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ServiceCategory } from '../../common/enums';
import { QueryServicesDto } from './dto/query-services.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
  ) {}

  async findAll(query: QueryServicesDto) {
    const where: FindOptionsWhere<Service>[] = [];
    const base: FindOptionsWhere<Service> = {};

    if (query.category) {
      base.category = query.category;
    }

    if (query.featured !== undefined) {
      base.featured = query.featured;
    }

    if (query.q) {
      where.push({ ...base, name: Like(`%${query.q}%`) });
      where.push({ ...base, shortDescription: Like(`%${query.q}%`) });
    } else {
      where.push(base);
    }

    const [data, total] = await this.services.findAndCount({
      where,
      order: { featured: 'DESC', name: 'ASC' },
    });

    return { data, meta: { total } };
  }

  async findBySlug(slug: string) {
    const service = await this.services.findOne({ where: { slug } });
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    return service;
  }

  categories(): ServiceCategory[] {
    return Object.values(ServiceCategory);
  }
}
