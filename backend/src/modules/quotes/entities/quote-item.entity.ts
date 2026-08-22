import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuoteItemKind } from '../../../common/enums';
import { Product } from '../../products/entities/product.entity';
import { Service } from '../../services/entities/service.entity';
import { Quote } from './quote.entity';

@Entity('quote_items')
export class QuoteItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  quoteId!: string;

  @ManyToOne(() => Quote, (quote) => quote.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quoteId' })
  quote!: Quote;

  @Column({ type: 'text' })
  kind!: QuoteItemKind;

  @Column({ type: 'text', nullable: true })
  serviceId!: string | null;

  @ManyToOne(() => Service, (service) => service.quoteItems, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'serviceId' })
  service!: Service | null;

  @Column({ type: 'text', nullable: true })
  productId!: string | null;

  @ManyToOne(() => Product, (product) => product.quoteItems, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product | null;

  @Column({ type: 'integer', default: 1 })
  quantity!: number;
}
