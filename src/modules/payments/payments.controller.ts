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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentDto) {
  //   return this.paymentsService.create(createPaymentDto);
  // }

  @Post('transactions/:transactionId/payments')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard)
  create(
    @Param('transactionId') transactionId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(transactionId, dto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentsService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentsService.remove(+id);
  // }
}
