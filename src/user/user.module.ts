import { userMutationResolver } from './resolvers/user.mutation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { userQueriesResolver } from './resolvers/user.queries.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  providers: [UserService, userMutationResolver, userQueriesResolver, jwtStrategy,
    {
      provide: 'userService',
      useClass: UserService
    }],
  exports: [UserService]
})
export class UserModule { }
