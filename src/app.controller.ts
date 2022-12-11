import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { auth, callback } from './interface/login.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
    ) {}

  @Get('auth-twitter') // Generate link to connect on twitter
  async authenticate(): Promise<auth> {
    return await this.appService.getAuth()
  }

  @Post('callback-twitter')
  async twitter(@Body() body:callback): Promise<any> {
    return await this.appService.callback(body);
  }

}
