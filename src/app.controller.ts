import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FirestoreService } from './firestore/firestore.service';
import { DejaCloudService } from './deja-cloud/deja-cloud.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private firestoreService: FirestoreService,
    private dejeCloudService: DejaCloudService,
  ) {
    this.firestoreService.initiazlize();
    this.dejeCloudService.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
