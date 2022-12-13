import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class userCreateInput {
    @Field(() => String)
    user_id: User['user_id']

    @Field(() => String)
    accessToken: User['accessToken']

    @Field(() => String)
    accessSecret: User['accessSecret']
}

@ObjectType()
export class userCreateOutput {
    @Field(() => User)
    user: User
}