import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class userCreateInput {
    @Field(() => String)
    user_id: string;

    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    accessSecret: string;
}

@ObjectType()
export class userCreateOutput {
    @Field(() => User)
    user: User
}