import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser'
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET','POST','DELETE','PUT'],
    origin: '*',
    credentials: true,
  })
  // Tăng giới hạn kích thước payload
  app.use(bodyParser.json({ limit: '10mb' })); // Tăng giới hạn cho JSON lên 10MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Tăng giới hạn cho URL-encoded lên 10MB

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
