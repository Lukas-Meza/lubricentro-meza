import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { appConfig } from '../config/env';
import { Product } from '../entities/product.entity';
import { QuoteItem } from '../entities/quote-item.entity';
import { Quote } from '../entities/quote.entity';
import { Service } from '../entities/service.entity';

// SQLite local. synchronize en true crea/actualiza tablas al arrancar (comodo en desarrollo).
export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: appConfig.sqlitePath,
  entities: [Service, Product, Quote, QuoteItem],
  synchronize: true,
});

export async function initDatabase(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
