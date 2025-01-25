import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrucksModule } from './trucks/trucks.module';
import { LocationsModule } from './locations/locations.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [UsersModule, AuthModule, TrucksModule, LocationsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
