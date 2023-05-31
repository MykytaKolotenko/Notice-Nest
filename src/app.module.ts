import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticesModule } from './notices/notices.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NoticesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
