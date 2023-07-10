import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const log: LogLevel[] = !(process.env.IS_PRODUCTION === 'true')
    ? ['log', 'warn', 'error']
    : ['error', 'warn', 'log', 'debug'];

  const app = await NestFactory.create(AppModule, {
    logger: log,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  var whitelist = [
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost',
  ];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        throw 'Blocked by cors: ' + origin;
      }
    },
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Swagger: API')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.URL_SWAGGER)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
