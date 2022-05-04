import './initEnv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from "body-parser";


async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT);
    

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  const configDocument = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configDocument);

  SwaggerModule.setup('api', app, document);


  await app.listen(port, () => {
    console.log('[WEB]', process.env.BASE_URL);
  });
}

bootstrap();