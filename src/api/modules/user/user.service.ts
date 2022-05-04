import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/helper/base-service.service';
import { User } from 'src/api/entities/user/user.entity';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
    ) {
        super(User)
    }

    async getUser(id: any): Promise<User> {
        return await this.getRepository().findOne({ id: id })
    }

    async setUser(user: User) {
        await this.getRepository().save(user)
    }

}