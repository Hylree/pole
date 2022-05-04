import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PoleModule } from './modules/pole/pole.module';

@Module({
  imports: [ 
    AuthModule,
    UserModule,
    PoleModule
  ]
})
export class ApiModule{}
