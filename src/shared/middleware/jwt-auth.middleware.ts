import { NestMiddleware, Injectable, UnauthorizedException, BadGatewayException, BadRequestException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UserService } from "src/api/modules/user/user.service";
import { User } from "src/api/entities/user/user.entity";
import * as moment from 'moment';

@Injectable()
export class JWTAuthMiddleware implements NestMiddleware {

    constructor(
        private usersService: UserService
    ) {

    }


    async use(req, res, next) {
        const authorization = this.getValue(req, "Authorization");
        if (!authorization) {
            throw new UnauthorizedException();
        }

        const tmp = authorization.split(" ");
        if (tmp.length !== 2 && tmp[0] !== "JWT") {
            throw new UnauthorizedException();
        } else {
            const { JWT_SECRET } = process.env;
            try {
                let jwtData: any = jwt.verify(tmp[1], JWT_SECRET);
                let user: User = await this.usersService.getUser(jwtData.id);

                if (!!user && user.accessToken === tmp[1]) {
                    console.log(user)
                    if (user.dateValidityCounter === null) {
                        user.dateValidityCounter = new Date();
                        user.counterTry = 1;
                    } else if (moment().utc().isAfter(moment(user.dateValidityCounter).utc().add(user.delayValidityCounter, 'minutes'))) {
                        user.dateValidityCounter = new Date();
                        user.counterTry = 1;
                    } else if (user.counterTry >= user.counter) {
                        throw new BadRequestException({message : 'Le nombre de jetons est épuisés.'});
                    } else {
                        user.counterTry += 1;
                    }
                    
                    console.log(user)
                } else {
                    throw new UnauthorizedException();
                }

                await this.usersService.setUser(user);
            } catch (e) {
                throw e;
            }
            next();
        }
    }

    private getValue(req, key) {
        return req.query[key] || (req.get(key) != "null" ? req.get(key) : null);
    }
}