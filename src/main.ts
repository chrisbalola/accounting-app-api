import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { E_TOO_MANY_REQUESTS } from './common/exceptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from './common/constants';

async function bootstrap() {
  // -- App Instantiation
  const app = await NestFactory.create(AppModule);

  // -- Helmet
  app.use(helmet());

  // -- Cors setup
  app.enableCors({
    origin: false, // Specify the allowed origins.  I'm setting false to allow requests from any origin
    // Find more configuration options here: https://github.com/expressjs/cors#configuration-options
  });

  // -- Rate limiting: Limits the number of requests from the same IP in a period of time.
  // -- More at: https://www.npmjs.com/package/express-rate-limit
  app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    skipSuccessfulRequests: false, // The counting will skip all successful requests and just count the errors. Instead of removing rate-limiting, it's better to set this to true to limit the number of times a request fails. Can help prevent against brute-force attacks
    message: { "message": E_TOO_MANY_REQUESTS, "statusCode": 403, }
  }));

  // -- Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // -- Swagger setup
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .addBearerAuth() // The API will use Bearer Authentication
    .addBasicAuth({ type: 'apiKey', name: 'accessToken', in: 'query' }) // The API will use basic authentication for admin access
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // -- Start listening
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
