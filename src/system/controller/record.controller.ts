import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateRecordDto } from '../dto/record.dto';
import { RecordService } from '../services/record.service';

const user = {};

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(user, createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordService.getUsersRecord(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecordDto) {
    return this.recordService.update(id, user, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(id, user);
  }
}
