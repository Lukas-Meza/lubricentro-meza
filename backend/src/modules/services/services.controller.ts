import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { QueryServicesDto } from './dto/query-services.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll(@Query() query: QueryServicesDto) {
    return this.servicesService.findAll(query);
  }

  @Get('categories')
  categories() {
    return this.servicesService.categories();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }
}
