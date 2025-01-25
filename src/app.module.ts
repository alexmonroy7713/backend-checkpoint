import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrucksModule } from './trucks/trucks.module';


@Module({
  imports: [UsersModule, AuthModule, TrucksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
