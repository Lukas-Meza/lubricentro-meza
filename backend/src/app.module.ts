import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './common/health.controller';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { ServicesModule } from './modules/services/services.module';
import { SiteModule } from './modules/site/site.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    SiteModule,
    ServicesModule,
    ProductsModule,
    QuotesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
