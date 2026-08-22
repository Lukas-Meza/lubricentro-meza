import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ProductCategory } from '../../common/enums';
import { QueryProductsDto } from './dto/query-products.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async findAll(query: QueryProductsDto) {
    const where: FindOptionsWhere<Product>[] = [];
    const base: FindOptionsWhere<Product> = {};

    if (query.category) {
      base.category = query.category;
    }

    if (query.featured !== undefined) {
      base.featured = query.featured;
    }

    if (query.inStock !== undefined) {
      base.inStock = query.inStock;
    }

    if (query.brand) {
      base.brand = Like(query.brand);
    }

    if (query.q) {
      where.push({ ...base, name: Like(`%${query.q}%`) });
      where.push({ ...base, brand: Like(`%${query.q}%`) });
      where.push({ ...base, shortDescription: Like(`%${query.q}%`) });
      where.push({ ...base, sku: Like(`%${query.q}%`) });
    } else {
      where.push(base);
    }

    const [data, total] = await this.products.findAndCount({
      where,
      order: { featured: 'DESC', category: 'ASC', name: 'ASC' },
    });

    return { data, meta: { total } };
  }

  async findBySlug(slug: string) {
    const product = await this.products.findOne({ where: { slug } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  categories(): ProductCategory[] {
    return Object.values(ProductCategory);
  }
}
