import { userMutationResolver } from './resolvers/user.mutation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { userQueriesResolver } from './resolvers/user.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, userMutationResolver, userQueriesResolver],
  exports: [UserService]
})
export class UserModule {}
