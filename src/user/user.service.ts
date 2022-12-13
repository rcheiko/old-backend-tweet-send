import { userDeleteOutput } from './dto/user-delete.dto';
import { userUpdateInput, userUpdateOutput } from './dto/user-update.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userCreateInput, userCreateOutput } from './dto/user-create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async userCreate(input: userCreateInput): Promise<userCreateOutput> {
        const newUser = this.userRepository.create(input)
        const user = await this.userRepository.save(newUser)
        return { user }
    }

    async userUpdate(user_id: User['user_id'], input: userUpdateInput): Promise<userUpdateOutput> {
        const user = await this.userRepository.findOne({
            where: {
                user_id: user_id
            }
        })
        if (!user)
            throw new HttpException(`Not Found user_id: ${user_id}`, HttpStatus.NOT_FOUND);
        user.accessToken = input.accessToken
        user.accessSecret = input.accessSecret
        user.save()
        return { user }
    }

    async userDelete(user_id: User['user_id']): Promise<userDeleteOutput> {
        const user = await this.userRepository.findOne({
            where: {
                user_id: user_id
            }
        })
        if (!user)
            throw new HttpException(`Not Found user_id: ${user_id} so he cannot be deleted`, HttpStatus.NOT_FOUND);
        await user.remove();
        return { user_id }
    }

    async userFindAll(): Promise<User[]> {
        const user = await this.userRepository.find()
        if (!user)
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        return user
    }

    async userFindOne(user_id: User['user_id']): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                user_id: user_id
            }
        })
        if (!user)
            throw new HttpException(`Not Found user_id: ${user_id}`, HttpStatus.NOT_FOUND)
        return user
    }
}
