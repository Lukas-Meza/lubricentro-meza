import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Service } from '../services/entities/service.entity';
import { QuoteItem } from './entities/quote-item.entity';
import { Quote } from './entities/quote.entity';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, QuoteItem, Service, Product])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
