import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../../../common/enums';
import { QuoteItem } from '../../quotes/entities/quote-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column({ type: 'text', nullable: true })
  sku!: string | null;

  @Column()
  shortDescription!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  category!: ProductCategory;

  @Column({ type: 'integer', nullable: true })
  priceFrom!: number | null;

  @Column({ default: true })
  inStock!: boolean;

  @Column({ default: false })
  featured!: boolean;

  @Column()
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
