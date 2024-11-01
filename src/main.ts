import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // const dejeCloudService = app.get(DejaCloudService);
  // dejeCloudService.connect();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
