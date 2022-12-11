import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userCreateInput, userCreateOutput } from './dto/user-create.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService  {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async userCreate(input: userCreateInput): Promise<userCreateOutput> {
        const newUser = this.userRepository.create(input);
        const user = await this.userRepository.save(newUser);
        return { user };
    }
}
