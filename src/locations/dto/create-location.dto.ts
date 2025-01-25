import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
