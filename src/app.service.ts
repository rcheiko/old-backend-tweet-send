import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ConfigService } from '@nestjs/config';

interface auth {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: "true";
  url: string;
}

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
  ) {}

  async getAuth(): Promise<auth> {
    const client = new TwitterApi({
      appKey: this.configService.get('API_KEY_TWITTER'),
      appSecret: this.configService.get('API_KEY_SECRET_TWITTER')
    })

    const authLink = await client.generateAuthLink('http://localhost:8000')
    console.log(authLink)
    return (authLink)
  }

  
}
