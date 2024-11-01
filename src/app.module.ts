import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { LocosModule } from './locos/locos.module';
import { LayoutsModule } from './layouts/layouts.module';
import { EffectsModule } from './effects/effects.module';
import { TurnoutsModule } from './turnouts/turnouts.module';
import { DejaCloudModule } from './deja-cloud/deja-cloud.module';
import { DccModule } from './dcc/dcc.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirestoreModule,
    // LocosModule,
    // TurnoutsModule,
    // EffectsModule,
    // LayoutsModule,
    DejaCloudModule,
    // DccModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
