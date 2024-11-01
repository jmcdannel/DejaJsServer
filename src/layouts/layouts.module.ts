import { Module } from '@nestjs/common';
import { LayoutsService } from './layouts.service';

@Module({
  providers: [LayoutsService],
})
export class LayoutsModule {}
