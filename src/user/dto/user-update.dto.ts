import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from '../entities/user.entity';

@InputType()
export class userUpdateInput {
    @Field(() => String)
    accessToken: User['accessToken']

    @Field(() => String)
    accessSecret: User['accessSecret']
}

@ObjectType()
export class userUpdateOutput{
    @Field(() => User)
    user: User
}