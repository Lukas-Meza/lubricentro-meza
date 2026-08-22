import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './common/health.controller';
import { PrismaModule } from './database/prisma.module';
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
    PrismaModule,
    SiteModule,
    ServicesModule,
    ProductsModule,
    QuotesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
