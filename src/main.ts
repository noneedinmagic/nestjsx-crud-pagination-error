import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const apiPort = process.env.PORT || 8765;
const apiBasePath = process.env.BASE_API_PATH || 'api';

import { AppModule } from '@app/AppModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(apiBasePath);

  const doc = new DocumentBuilder()
    // .setTitle()
    .build();
  SwaggerModule.setup(apiBasePath, app, SwaggerModule.createDocument(app, doc));

  await app.listen(apiPort);
}
bootstrap();
