import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../common/enums';
import { QuoteItem } from './quote-item.entity';

// Catalogo de productos (aceites, filtros, neumaticos, baterias, etc.)
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  brand!: string;

  @Column({ type: 'varchar', nullable: true })
  sku!: string | null;

  @Column({ type: 'varchar' })
  shortDescription!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar' })
  category!: ProductCategory;

  @Column({ type: 'integer', nullable: true })
  priceFrom!: number | null;

  @Column({ type: 'boolean', default: true })
  inStock!: boolean;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'varchar' })
  imageUrl!: string;

  @Column({ type: 'simple-json', nullable: true })
  specs!: Record<string, string> | null;

  @OneToMany(() => QuoteItem, (item) => item.product)
  quoteItems!: QuoteItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
