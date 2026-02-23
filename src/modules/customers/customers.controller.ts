import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RequirePermissions } from 'src/common/permissions/permissions.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionGuard } from 'src/common/permissions/permission.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Throttle({ long: {} })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('customers.read')
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('customers.read')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('customers.update')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('customers.delete')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
