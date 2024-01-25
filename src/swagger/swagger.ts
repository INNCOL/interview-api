import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('Interview')
        .setDescription("Inncol's interview API")
        .setVersion('1.0.0')
        .addTag('Beginner', 'APIs suitable for beginners')
        .addTag('Intermediate', 'APIs suitable for intermediate users')
        .addTag('Advanced', 'APIs suitable for advanced users')
        .addTag('Expert', 'APIs suitable for expert users')
        .build();


    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
};
