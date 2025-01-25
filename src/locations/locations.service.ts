import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService extends PrismaClient {
  async create(createLocationDto: CreateLocationDto) {
    const { placeId } = createLocationDto;

   
    const existingLocation = await this.location.findUnique({
      where: { placeId },
    });
    if (existingLocation) {
      throw new ConflictException('A location with this placeId already exists');
    }
    const location = await this.location.create({ data: createLocationDto });
     return {
      message: 'Location created successfully',
      location
     }
  }

  async findAll() {
    return this.location.findMany();
  }

  async findOne(id: number) {
    const location = await this.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return this.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: number) {
    const location = await this.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return this.location.delete({
      where: { id },
    });
  }
}
