import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSwaggerBuilderConfig } from './shared/constants/swagger.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await getSwaggerBuilderConfig(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
  Logger.debug(`Server is listening on port: ${port}`);
}
bootstrap();
