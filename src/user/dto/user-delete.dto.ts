import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class userDeleteOutput {
    @Field(() => String)
    user_id: User['user_id']
}