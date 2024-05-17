import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SortPipePipe } from './sort-pipe/sort-pipe.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new SortPipePipe());
  await app.listen(3001);
}
bootstrap();
