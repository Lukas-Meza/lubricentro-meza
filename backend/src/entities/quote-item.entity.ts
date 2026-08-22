import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuoteItemKind } from '../common/enums';
import { Product } from './product.entity';
import { Quote } from './quote.entity';
import { Service } from './service.entity';

// Linea de una cotizacion: apunta a un servicio o a un producto
@Entity('quote_items')
export class QuoteItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  quoteId!: string;

  @ManyToOne(() => Quote, (quote) => quote.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quoteId' })
  quote!: Quote;

  @Column({ type: 'varchar' })
  kind!: QuoteItemKind;

  @Column({ type: 'varchar', nullable: true })
  serviceId!: string | null;

  @ManyToOne(() => Service, (service) => service.quoteItems, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'serviceId' })
  service!: Service | null;

  @Column({ type: 'varchar', nullable: true })
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
