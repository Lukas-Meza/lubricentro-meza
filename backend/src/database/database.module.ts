import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Product } from '../modules/products/entities/product.entity';
import { QuoteItem } from '../modules/quotes/entities/quote-item.entity';
import { Quote } from '../modules/quotes/entities/quote.entity';
import { Service } from '../modules/services/entities/service.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const database = config.get<string>(
          'SQLITE_PATH',
          join(process.cwd(), 'data', 'lubricentro.sqlite'),
        );
        mkdirSync(dirname(database), { recursive: true });

        return {
          type: 'better-sqlite3' as const,
          database,
          entities: [Service, Product, Quote, QuoteItem],
          synchronize: true,
          logging: config.get<string>('TYPEORM_LOGGING') === 'true',
        };
      },
    }),
    TypeOrmModule.forFeature([Service, Product]),
  ],
  providers: [SeedService],
})
export class DatabaseModule {}
