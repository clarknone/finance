import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsEnum(['credit', 'debit'])
  type: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class EditRecordDto extends PartialType(CreateRecordDto) {}
