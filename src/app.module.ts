import { Module, NestModule, RequestMethod, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConnectionOptions } from 'typeorm';
import { JWTAuthMiddleware } from './shared/middleware/jwt-auth.middleware';
import { UserModule } from './api/modules/user/user.module';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env;

const POSTGRES_DB_CONFIG: ConnectionOptions = {
  name: 'POSTGRES',
  type: "postgres",
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: ["error"],
  entities: [
    "dist/**/*.entity{.ts,.js}"
  ],
  subscribers: [
    "dist/**/*.subscriber{.ts,.js}"
  ]
};

console.log(POSTGRES_DB_CONFIG)

@Module({
  imports: [
    TypeOrmModule.forRoot(POSTGRES_DB_CONFIG),
    HttpModule,
    ApiModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports: [HttpModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {

    let excludedRoutes = [
      { path: "/auth/login", method: RequestMethod.POST },
    ];

    consumer.apply(JWTAuthMiddleware).exclude(...excludedRoutes).forRoutes("/**");
  }


}