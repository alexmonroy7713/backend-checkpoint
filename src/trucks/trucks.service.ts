import { Injectable, NotFoundException, ConflictException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TrucksService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  async create(createTruckDto: CreateTruckDto) {
    return this.truck.create({
      data: (
        createTruckDto
      )
    });
    
 
  }

  async findAll() {
    return this.truck.findMany();
  }

  async findOne(id: number) {
    const truck = await this.truck.findUnique({
      where: {
        id: id
      }
    });
    if (!truck) {
      throw new NotFoundException('Truck not found');
    }
    return truck;
  
  }

  async update(id: number, updateTruckDto: UpdateTruckDto) {
    return this.truck.update({
      where: {
        id: id
      },
      data: (
        updateTruckDto
      )
    });
  
  }

  async remove(id: number) {
    return this.truck.delete({
      where: {
        id: Number(id)
      }
    });
   
  }
}
