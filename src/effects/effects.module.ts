import { Module } from '@nestjs/common';
import { EffectsService } from './effects.service';

@Module({
  providers: [EffectsService],
})
export class EffectsModule {}
