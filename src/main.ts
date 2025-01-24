import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './config/envs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades desconocidas
      transform: true, // 
    }),
  );
  await app.listen(envVars.PORT );
  console.log(`Application is running on: ${envVars.PORT}`);
  
}
bootstrap();
