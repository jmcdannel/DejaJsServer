import { Module } from '@nestjs/common';
import { LocosService } from './locos.service';

@Module({
  providers: [LocosService],
})
export class LocosModule {}
