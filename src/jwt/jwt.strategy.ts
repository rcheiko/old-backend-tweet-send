import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { jwtPayload } from 'src/interface/jwt-payload.interface';

export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(@Inject('userService')
                private userService: UserService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: jwtPayload) {
        const user = await this.userService.userFindOne(payload.id);
        if (user === undefined) {
            throw new UnauthorizedException;
        }
        return ({
            id: payload.id,
            username: payload.username
        })
    }
}