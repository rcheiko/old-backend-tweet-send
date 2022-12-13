import { Body, Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ConfigService } from '@nestjs/config';
import { auth, callback } from './interface/login.interface';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
  ) { }

  async getAuth(): Promise<auth> {
    const client = new TwitterApi({
      appKey: this.configService.get('API_KEY_TWITTER'),
      appSecret: this.configService.get('API_KEY_SECRET_TWITTER')
    })

    const authLink = await client.generateAuthLink('http://localhost:8000')
    return (authLink)
  }

  async callback(body: callback): Promise<any> {
    const client = new TwitterApi({
      appKey: this.configService.get('API_KEY_TWITTER'),
      appSecret: this.configService.get('API_KEY_SECRET_TWITTER'),
      accessToken: body.oauth_token,
      accessSecret: body.oauth_token_secret,
    });
    try {
      const { client: loggedClient, accessToken, accessSecret } = await client.login(body.oauth_verifier)
      console.log('loggedClient', loggedClient)
      console.log('accessToken', accessToken)
      console.log('accessSecret', accessSecret)  
    } catch (err) {
      console.log('error: refused to connect')
      return 'error'
    }
  }

}
