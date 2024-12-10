import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Allow only the frontend
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    credentials: true, // Allow cookies if necessary
  });

  await app.listen(3000); // Make sure the backend is on a different port
}
bootstrap();
