import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`App start on port ${process.env.APP_PORT}`);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
