import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envVars.PORT );
  console.log(`Application is running on: ${envVars.PORT}`);
  
}
bootstrap();
