import { userCreateInput, userCreateOutput } from './user-create.dto';
import { InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class userUpdateInput extends userCreateInput {}

@ObjectType()
export class userUpdateOutput extends userCreateOutput {}