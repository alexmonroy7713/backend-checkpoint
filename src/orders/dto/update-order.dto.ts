import { IsOptional, IsEnum, IsInt, IsPositive } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  truckId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  pickupId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  dropoffId?: number;

  @IsOptional()
  @IsEnum(['created', 'in transit', 'completed'], {
    message: 'Status must be one of: created, in transit, completed',
  })
  status?: string;
}
