import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface auth {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: "true";
  url: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth') // Generate link to connect on twitter
  async authenticate(): Promise<auth> {
    return await this.appService.getAuth()
  }

  // @Post('callback')
  // async 

}
