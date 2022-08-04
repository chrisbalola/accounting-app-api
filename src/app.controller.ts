import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse()
  helloWorld() {
    return this.appService.getHello();
  }
}
