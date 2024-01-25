import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import helmet from 'helmet';
import express from 'express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v'
  });

  app.use(helmet());
  app.use('/swagger-ui', express.static('path/to/swagger-ui', {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath);
      switch (ext) {
        case '.css':
          res.type('text/css');
          break;
        case '.js':
          res.type('application/javascript');
          break;
      }
    },
  }));

  setupSwagger(app);
  await app.listen(process.env.PORT);
}
bootstrap();
