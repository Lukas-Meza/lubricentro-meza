import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceCategory } from '../common/enums';
import { QuoteItem } from './quote-item.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  shortDescription!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'integer', nullable: true })
  durationMin!: number | null;

  @Column({ type: 'integer', nullable: true })
  priceFrom!: number | null;

  @Column({ type: 'varchar' })
  category!: ServiceCategory;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'varchar' })
  imageUrl!: string;

  @Column({ type: 'simple-json', default: '[]' })
  includes!: string[];

  @OneToMany(() => QuoteItem, (item) => item.service)
  quoteItems!: QuoteItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
