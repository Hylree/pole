import { Module, HttpModule } from '@nestjs/common';
import { PoleController } from './pole.controller';
import { PoleService } from './pole.service';

@Module({
  imports : [HttpModule],
  controllers: [PoleController],
  providers: [PoleService],
  exports : []
})
export class PoleModule {}
