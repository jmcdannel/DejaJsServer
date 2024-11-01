import { Module } from '@nestjs/common';
import { TurnoutsService } from './turnouts.service';

@Module({
  providers: [TurnoutsService],
})
export class TurnoutsModule {}
