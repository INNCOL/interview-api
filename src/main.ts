import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import helmet from 'helmet';
import { get } from 'http';
import { createWriteStream } from 'fs';
import path from 'path';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v'
  });

  app.use(helmet());
  const swaggerUiPath = path.join(__dirname, '..', 'swagger-static');
  app.use('/api/swagger-ui-standalone-preset.js', express.static(swaggerUiPath, {
    setHeaders: (res, filePath) => {
      res.type('application/javascript');
    },
  }));

  app.use('/api/swagger-ui.css', express.static(swaggerUiPath, {
    setHeaders: (res, filePath) => {
      res.type('text/css');
    },
  }));
  setupSwagger(app);
  await app.listen(process.env.PORT);
  const serverUrl = await app.getUrl();


  console.log(`Server running at : ${serverUrl}`)
}

bootstrap();
