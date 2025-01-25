import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsPositive,
    Matches,
    MinLength,
    MaxLength,
  } from 'class-validator';
  
  export class CreateTruckDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    userId: number;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{4}$/, {
      message: 'The year must be a 4-digit number (e.g., 2023)',
    })
    year: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Color must be at least 3 characters long' })
    color: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Plates must be at least 3 characters long' })
    @MaxLength(10, { message: 'Plates must not exceed 10 characters' })
    plates: string;
  }
  