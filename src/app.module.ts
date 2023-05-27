import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticesModule } from './notices/notices.module';

@Module({
  imports: [NoticesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
