import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { AuthUserInterface } from '../interfaces/auth-user.interface';
import { CloseShiftDto } from './dto/close-shift.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @Throttle({ long: {} })
  create(
    @Body() createShiftDto: CreateShiftDto,
    @Req() req: Request & { user: AuthUserInterface },
  ) {
    const user = req.user;
    return this.shiftsService.create(createShiftDto, user);
  }

  @Patch(':id/close')
  @Throttle({ long: {} })
  closeShift(
    @Param('id') id: number,
    @Body() closeShiftDto: CloseShiftDto,
    @Req() req: Request & { user: AuthUserInterface },
  ) {
    const user = req.user;
    return this.shiftsService.closeShift(id, closeShiftDto, user);
  }

  @Get()
  @Throttle({ long: {} })
  findAll() {
    return this.shiftsService.findAll();
  }

  @Get(':id')
  @Throttle({ long: {} })
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(+id);
  }

  @Patch(':id')
  @Throttle({ long: {} })
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(+id, updateShiftDto);
  }

  @Delete(':id')
  @Throttle({ long: {} })
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(+id);
  }
}
