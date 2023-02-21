import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category.module';
import { RecordModule } from './modules/record.module';

@Module({
  imports: [CategoryModule, RecordModule],
})
export class SystemModule {}
