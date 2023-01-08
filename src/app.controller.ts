import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { auth, callback } from './interface/login.interface';
import { JwtGuard } from './jwt/jwt.guard';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private configService: ConfigService,
    // @InjectRepository(User) private userRepository: Repository<User>,
    // private userService: UserService,
    ) {}

  @Get('auth-twitter') // Generate link to connect on twitter
  async authenticate(): Promise<auth> {
    return await this.appService.getAuth()
  }

  @Post('callback-twitter')
  async twitter(@Body() body:callback): Promise<any> {
    return await this.appService.callback(body)
  }

  @UseGuards(JwtGuard)
  @Get('test') // Generate link to connect on twitter
  async test(): Promise<string> {
    return "WORKING";
  }

}
