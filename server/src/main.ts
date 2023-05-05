import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: {
        origin: '*',
      },
    });

    await app.listen(3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    throw new Error(error);
  }
}
bootstrap();
