import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll() {
    const customers = await this.prisma.customer.findMany();
    return createResponse(customers);
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    return createResponse(customer);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = this.prisma.customer.update({
      where: { id },
      data: {
        ...updateCustomerDto,
      },
    });
    return createResponse(customer);
  }

  remove(id: string) {
    const customer = this.prisma.customer.delete({
      where: { id },
    });
    return createResponse(customer);
  }
}
