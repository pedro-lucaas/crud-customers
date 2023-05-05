import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: {
        origin: '*',
      },
    });

    await app.listen(3000);

    Logger.log(`Server running on ${await app.getUrl()}`);
    Logger.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    throw new Error(error);
  }
}
bootstrap();
