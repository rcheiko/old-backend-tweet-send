import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ConfigService } from '@nestjs/config';
import { auth, callback } from './interface/login.interface';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,

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

      const user = await loggedClient.v2.me();

      if (this.checkUserExist(user.data.id)) {
        const createUser = this.userRepository.create({
          user_id: user.data.id,
          accessSecret: accessSecret,
          accessToken: accessToken,
        })
        await this.userRepository.save(createUser);
      }
    } catch (err) {
      console.log('error: refused to connect')
      return 'error'
    }
  }

  async checkUserExist(user_id: string): Promise<boolean> {
    const res = await this.userService.userFindOne(user_id)
    if (res === undefined)
      return false
    return true
  }
}
