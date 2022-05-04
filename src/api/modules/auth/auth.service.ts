import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InCreateLoginDto } from './dto/in-create-login.dto';
import { CryptoHelper } from 'src/common/helper/crypto.helper';
import { User } from 'src/api/entities/user/user.entity';
import { BaseService } from 'src/common/helper/base-service.service';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService extends BaseService<User>{

    constructor() {
        super(User)
    }

    public async login(inCreateLoginDto: InCreateLoginDto) {

        const user: User = await this.getRepository().findOne({ loginEmail: inCreateLoginDto.login });

        if (!!user) {
            const passwordCompareResult: boolean = await CryptoHelper.comparePassord(inCreateLoginDto.password, user.password);

            if (passwordCompareResult) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                await this.getRepository().update(user.id, { lastLoginAt: new Date(), accessToken: token });
                return { accessToken: token };

            } else throw new UnauthorizedException({ message: 'Echec de la connexion à l\'api' });

        } else throw new UnauthorizedException({ message: 'Echec de la connexion à l\'api' });

    }
}
