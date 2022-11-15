import { Controller, Get, Param } from '@nestjs/common';
import { AppService, Features } from './app.service';

@Controller('features')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getFeatures(): Features[] {
    return this.appService.getFeatures();
  }

  @Get(':id')
  getOne(@Param('id')id):string {
    return 'Feature id:  ' + id;
  }
}
