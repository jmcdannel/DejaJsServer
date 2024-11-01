import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LayoutsService } from './layouts.service';

@Module({
  imports: [ConfigModule],
  providers: [LayoutsService],
  exports: [LayoutsService],
})
export class LayoutsModule {}
