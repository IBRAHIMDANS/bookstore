import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/shared/exceptions/filters/http-exception.filter';
import { BadRequestExceptionFilter } from '@/shared/exceptions/filters/bad.request.exception.filter';
import { ResourceNotFoundExceptionFilter } from '@/shared/exceptions/filters/resource.not.found.exception.filter';
import { LoggingInterceptor } from '@/shared/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: process.env.CORS_ORIGIN, credentials: true });
  // config cookie parser
  app.use(cookieParser());
  // config compression
  app.use(compression());
  // config helmet
  app.use(helmet());
  // // config global filters
  // app.useGlobalFilters(
  //   new HttpExceptionFilter(),
  //   new BadRequestExceptionFilter(),
  //   new ResourceNotFoundExceptionFilter(),
  // );

  // config global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // config global interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new LoggingInterceptor());

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const config = new DocumentBuilder()
    .setTitle('Book Store')
    .setDescription('bookStore API')
    .setVersion('1.0')
    .addTag('books store')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // launch server
  await app.listen(configService.get('app.port'), () => {
    console.log(`App Starting to port : ${configService.get('app.baseUrl')}`);
  });
}

bootstrap();
