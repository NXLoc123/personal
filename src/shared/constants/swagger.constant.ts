import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClientModule } from '../../modules/client/client.module';

export const getSwaggerBuilderConfig = async (
  app: INestApplication,
): Promise<void> => {
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
};
