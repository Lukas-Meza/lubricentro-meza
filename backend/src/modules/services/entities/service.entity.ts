import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceCategory } from '../../../common/enums';
import { QuoteItem } from '../../quotes/entities/quote-item.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column()
  shortDescription!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'integer', nullable: true })
  durationMin!: number | null;

  @Column({ type: 'integer', nullable: true })
  priceFrom!: number | null;

  @Column({ type: 'text' })
  category!: ServiceCategory;

  @Column({ default: false })
  featured!: boolean;

  @Column()
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
