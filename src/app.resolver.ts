import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { JwtGuard } from "./jwt/jwt.guard";

@Resolver()
export class AppResolver {

    @UseGuards(JwtGuard)
    @Query(() => String)
    sayHello(): String {
        return '1234';
    }
}