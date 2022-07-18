import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiMovedPermanentlyResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/docs')
  @ApiMovedPermanentlyResponse({ description: "Redirects to /docs" })
  loadDocs() {}
}
