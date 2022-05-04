import { Controller, Post, Body } from '@nestjs/common';
import { InCreateLoginDto } from './dto/in-create-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly serviceAuth: AuthService
    ) { }

    @Post('login')
    public async login(@Body() inCreateLoginDto: InCreateLoginDto) {
        return await this.serviceAuth.login(inCreateLoginDto);
    }

}
