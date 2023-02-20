import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SysModule } from './sys/sys.module';
import { SystemModule } from './system/system.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, SysModule, SystemModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
