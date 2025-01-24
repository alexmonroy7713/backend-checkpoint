import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService  extends PrismaClient implements OnModuleInit{
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  onModuleInit() {
    this.$connect();
    console.log('Connected to the database');
    
  }
  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { name: createUserDto.name },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email or name already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return {
      message: 'User created successfully',
      user,
    };
  }



  async login (loginUserDto: {email: string, password: string}) {
    const user = await this.user.findUnique({
      where: {
        email: loginUserDto.email
      }
    });
    if(!user){
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {
      message: 'User logged in successfully',
      user,
      token
    };
  }


  findAll() {
    return this.user.findMany(
    );
  }

  async  findOne(id: number) {
    const user = await this.user.findUnique({
      where: {
        id: id
      }
    });
    if(!user){
      throw new Error('User not found');
    }
    return  user ;
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    const user = this.user.update({
      where: {
        id: id
      },
      data: updateUserDto
    });
    if(!user){
      throw new Error('User not found');
    }
    return {
      message: 'User updated successfully',
      user
    };
  }

   async remove(id: number) {
    await this.findOne(id);
    const user = await this.user.delete({
      where: {
        id: id
      }
    });

    return {
      messsage: 'User deleted successfully',
      user
    };
  }
}
