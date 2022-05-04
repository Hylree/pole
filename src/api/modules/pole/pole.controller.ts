import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreatePoleDto } from './dto/create-pole.dto';
import { PoleService } from './pole.service';

@Controller('pole')
export class PoleController {
    constructor(
        private readonly servicePole: PoleService
      ) {}
      
    @Post()
    public async getEnterprises(@Req() req, @Body() createPoleDto: CreatePoleDto) {
        return this.servicePole.getEnterprise(createPoleDto);
    }
}