import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v'
  });

  app.use(helmet());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
