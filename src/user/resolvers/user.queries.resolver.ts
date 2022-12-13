import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";

@Resolver(User)
export class userQueriesResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    async userFindAll() {
        return this.userService.userFindAll()
    }

    @Query(() => User)
    async userFindOne(@Args({ name: 'user_id', type: () => String }) user_id: User['user_id']) {
        return this.userService.userFindOne(user_id)
    }
}