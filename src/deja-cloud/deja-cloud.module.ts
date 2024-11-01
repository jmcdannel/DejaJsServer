import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LayoutsModule } from '../layouts/layouts.module';
import { DejaCloudService } from './deja-cloud.service';

@Module({
  imports: [ConfigModule, LayoutsModule],
  providers: [DejaCloudService],
  exports: [DejaCloudService],
})
export class DejaCloudModule {}
