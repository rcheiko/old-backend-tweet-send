import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Module({
  providers: [TweetService]
})
export class TweetModule {}
