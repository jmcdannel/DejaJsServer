import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DejaCloudService } from './deja-cloud.service';

@Module({
  imports: [ConfigModule],
  providers: [DejaCloudService],
  exports: [DejaCloudService],
})
export class DejaCloudModule {}
