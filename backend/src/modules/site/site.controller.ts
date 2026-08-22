import { Controller, Get } from '@nestjs/common';
import { SiteService } from './site.service';
import type { SiteInfo } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  getSite(): SiteInfo {
    return this.siteService.getInfo();
  }
}
