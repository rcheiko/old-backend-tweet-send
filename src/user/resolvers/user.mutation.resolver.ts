import { userUpdateInput, userUpdateOutput } from './../dto/user-update.dto';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { userCreateInput, userCreateOutput } from "../dto/user-create.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";
import { userDeleteOutput } from '../dto/user-delete.dto';

@Resolver(User)
export class userMutationResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => userCreateOutput)
    async userCreate(@Args('input') input: userCreateInput) {
        return this.userService.userCreate(input);
    }

    @Mutation(() => userUpdateOutput)
    async userUpdate(
        @Args({ name: 'user_id', type: () => String }) user_id: User['user_id'],
        @Args('input') input: userUpdateInput
    ) {
        return this.userService.userUpdate(user_id, input);
    }

    @Mutation(() => userDeleteOutput)
    async userDelete(@Args({ name: 'user_id', type: () => String }) user_id: User['user_id']) {
        return this.userService.userDelete(user_id);
    }
}