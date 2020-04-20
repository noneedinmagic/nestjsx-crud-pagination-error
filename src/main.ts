import 'module-alias/register';

import { NestFactory } from '@nestjs/core';

const apiPort = process.env.PORT || 8765;
const apiBasePath = process.env.BASE_API_PATH || 'api';

import { AppModule } from '@app/AppModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(apiBasePath);

  await app.listen(apiPort);
}
bootstrap();
