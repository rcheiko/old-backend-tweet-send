import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function loadApp() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() // Swagger
    .setTitle('API MyPersonalProject')
    .setDescription('A TweetDeck Responsive with some new feature')
    .setVersion('1.0')
    .addTag('tweet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet()); // Security

  app.enableCors({
    origin: [process.env.FRONTEND_URL]
  });

  await app.listen(process.env.PORT);
}

loadApp();