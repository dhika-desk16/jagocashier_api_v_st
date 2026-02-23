import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionGuard } from 'src/common/permissions/permission.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionsService.create(
      createTransactionDto,
      req.user.userId,
    );
  }

  @Get()
  @Throttle({ long: {} })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @Throttle({ long: {} })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @Throttle({ long: {} })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @Throttle({ long: {} })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
