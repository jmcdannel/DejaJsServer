import { Module } from '@nestjs/common';
import { DccService } from './dcc.service';
import { DccController } from './dcc.controller';

@Module({
  controllers: [DccController],
  providers: [DccService],
})
export class DccModule {}
