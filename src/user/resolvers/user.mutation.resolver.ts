import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { userCreateInput, userCreateOutput } from "../dto/user-create.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";

@Resolver(User)
export class userMutationResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => userCreateOutput)
    async userCreate(
        @Args('input') input: userCreateInput,
    ) {
        return this.userService.userCreate(input);
    }
}