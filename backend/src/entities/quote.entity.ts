import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuoteStatus } from '../common/enums';
import { QuoteItem } from './quote-item.entity';

// Cotizacion guardada desde el formulario (cliente + vehiculo + items)
@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  phone!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true })
  vehicleMake!: string | null;

  @Column({ type: 'varchar', nullable: true })
  vehicleModel!: string | null;

  @Column({ type: 'integer', nullable: true })
  vehicleYear!: number | null;

  @Column({ type: 'text', nullable: true })
  message!: string | null;

  @Column({ type: 'varchar', default: QuoteStatus.PENDING })
  status!: QuoteStatus;

  @OneToMany(() => QuoteItem, (item) => item.quote, { cascade: true })
  items!: QuoteItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
