import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetAuthUser } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/helpers/guard/auth.guard';
import { IAuthUser } from 'src/auth/interfaces/auth.interface';
import { CreateRecordDto } from '../dto/record.dto';
import { RecordService } from '../services/record.service';

// const user = {};

@UseGuards(JwtAuthGuard)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(
    @Body() createRecordDto: CreateRecordDto,
    @GetAuthUser() user: IAuthUser,
  ) {
    return this.recordService.create(user, createRecordDto);
  }

  @Get()
  findAll(@GetAuthUser() user: IAuthUser) {
    return this.recordService.getUsersRecord(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @GetAuthUser() user: IAuthUser,
    @Body() updateRecordDto,
  ) {
    return this.recordService.update(id, user, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetAuthUser() user: IAuthUser) {
    return this.recordService.remove(id, user);
  }
}
