import { IsNotEmpty, IsEnum, IsInt, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  truckId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  pickupId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  dropoffId: number;

  @IsEnum(['created', 'in transit', 'completed'], {
    message: 'Status must be one of: created, in transit, completed',
  })
  status: string;
}
