import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return createResponse(newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
        store: true,
      },
    });
    return createResponse(users);
  }

  findOne(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        store: true,
      },
    });
    return createResponse(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
        store: true,
      },
    });

    return createResponse(user);
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        role: true,
        store: true,
      },
    });

    return createResponse(user);
  }
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true, store: true },
    });

    return createResponse(user);
  }
}
