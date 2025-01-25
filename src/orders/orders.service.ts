import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService extends PrismaClient {
  // Crear una nueva orden
  async create(createOrderDto: CreateOrderDto) {
    const { userId, truckId, pickupId, dropoffId, status } = createOrderDto;

    // Validar si el usuario existe
    const userExists = await this.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Validar si el camión existe
    const truckExists = await this.truck.findUnique({ where: { id: truckId } });
    if (!truckExists) {
      throw new NotFoundException(`Truck with id ${truckId} not found`);
    }

    // Validar si el pickup location existe
    const pickupExists = await this.location.findUnique({ where: { id: pickupId } });
    if (!pickupExists) {
      throw new NotFoundException(`Pickup location with id ${pickupId} not found`);
    }

    // Validar si el dropoff location existe
    const dropoffExists = await this.location.findUnique({ where: { id: dropoffId } });
    if (!dropoffExists) {
      throw new NotFoundException(`Dropoff location with id ${dropoffId} not found`);
    }

    // Validar que pickup y dropoff no sean iguales
    if (pickupId === dropoffId) {
      throw new BadRequestException('Pickup and dropoff locations cannot be the same');
    }

    // Crear la orden si todas las validaciones pasan
    return this.order.create({
      data: {
        userId,
        truckId,
        pickupId,
        dropoffId,
        status,
      },
    });
  }

  // Listar todas las órdenes
  async findAll() {
    return this.order.findMany({
      include: {
        user: true,
        truck: true,
        pickup: true,
        dropoff: true,
      },
    });
  }

  // Buscar una orden por ID
  async findOne(id: number) {
    const order = await this.order.findUnique({
      where: { id },
      include: {
        user: true,
        truck: true,
        pickup: true,
        dropoff: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  // Actualizar una orden
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    const { userId, truckId, pickupId, dropoffId } = updateOrderDto;

    // Validar relaciones si se envían nuevos valores
    if (userId) {
      const userExists = await this.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
    }
    if (truckId) {
      const truckExists = await this.truck.findUnique({ where: { id: truckId } });
      if (!truckExists) {
        throw new NotFoundException(`Truck with id ${truckId} not found`);
      }
    }
    if (pickupId) {
      const pickupExists = await this.location.findUnique({ where: { id: pickupId } });
      if (!pickupExists) {
        throw new NotFoundException(`Pickup location with id ${pickupId} not found`);
      }
    }
    if (dropoffId) {
      const dropoffExists = await this.location.findUnique({ where: { id: dropoffId } });
      if (!dropoffExists) {
        throw new NotFoundException(`Dropoff location with id ${dropoffId} not found`);
      }
    }

    // Actualizar la orden
    return this.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  // Eliminar una orden
  async remove(id: number) {
    const order = await this.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return this.order.delete({
      where: { id },
    });
  }

  // Cambiar el estado de la orden
  async changeStatus(id: number, status: string) {
    const validStatuses = ['created', 'in transit', 'completed'];

    // Validar que el estado sea válido
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Status must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await this.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return this.order.update({
      where: { id },
      data: { status },
    });
  }
}
