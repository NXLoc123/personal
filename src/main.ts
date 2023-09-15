import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClientModule } from './modules/client/client.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  const ClientSwagger = new DocumentBuilder()
    .setTitle('APIs documentation for client')
    .setDescription('The APIs description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const ClientDocument = SwaggerModule.createDocument(app, ClientSwagger, {
    include: [ClientModule],
  });
  SwaggerModule.setup('client/api', app, ClientDocument);

  Logger.debug(`Server is listening on port: ${port}`);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
}
bootstrap();
