import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Firestore } from 'firebase/firestore';
import { FirestoreService } from '../firestore/firestore.service';
// import { LayoutsService } from '../layouts/layouts.service';
import {
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  limit,
  orderBy,
} from 'firebase/firestore';
import { Layout } from 'src/layouts/entities/layout.entity';

@Injectable()
export class DejaCloudService {
  constructor(
    private configService: ConfigService,
    private firestoreService: FirestoreService,
    // private layoutService: LayoutsService,
  ) {
    console.log('DejaCloudService.constructor');
    this.db = this.firestoreService.getDb();
    console.log('DejaCloudService', this.db?.app.name);
  }

  private db: Firestore = null;
  private layoutId: string = null;

  async handleDccCommands(snapshot) {
    // log.note('handleDccCommands')
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const { action, payload: payloadRaw } = change.doc.data();
        const payload = JSON.parse(payloadRaw);
        console.log('handleDccCommands: ', action, payload);
        // dcc.handleMessage(JSON.stringify({ action, payload }));
      }
    });
  }

  async handleDejaCommands(snapshot) {
    // log.note('handleDejaCommands')
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        const { action, payload } = change.doc.data();
        console.log('handleDejaCommands: ', action, payload);
        // dcc.handleMessage(JSON.stringify({ action, payload }))
        // switch (action) {
        //   case 'connect':
        //     await connectDevice(payload)
        //     break
        //   case 'effects':
        //     await handleEffectCommand(payload)
        //     break
        //   case 'macro':
        //     await handleMacroCommand(payload)
        //     break
        //   case 'turnouts':
        //     await handleTurnoutCommand(payload)
        //     break
        //   default:
        //     //noop
        //     log.warn('Unknown action in `handleMessage`', action, payload)
        // }
      }
    });
  }

  async handleThrottleCommands(snapshot) {
    // log.note('handleThrottleCommands')
    snapshot.docChanges().forEach(async (change) => {
      const throttleCmd = {
        address: parseInt(change.doc.data().address),
        speed: change.doc.data().direction
          ? change.doc.data().speed
          : -change.doc.data().speed,
      };
      console.log(
        'Throttle change',
        change.type,
        change.doc.data(),
        throttleCmd,
      );
      //     // const consist = locos?.value
      //     //   ? unref(locos.value).find((loco) => loco.locoId == throttleCmd.address)
      //     //       ?.consist || []
      //     //   : []
      //     // console.log(
      //     //   "Consist",
      //     //   consist,
      //     //   throttleCmd,
      //     //   unref(locos.value).find((loco) => loco.locoId == throttleCmd.address),
      //     //   locos.value
      //     // )
      //     // if (consist.length > 0) {
      //     //   consist.forEach(async (consistLoco) => {
      //     //     let consistSpeed
      //     //     if (consistLoco.direction) {
      //     //       // forward
      //     //       consistSpeed = throttleCmd.speed + consistLoco.trim
      //     //     } else {
      //     //       // backward
      //     //       consistSpeed = throttleCmd.speed - consistLoco.trim
      //     //     }
      //     //     const consistCmd = {
      //     //       address: consistLoco.address,
      //     //       speed: consistSpeed,
      //     //     }
      //     //     await sendSpeed(consistCmd)
      //     //   })
      //     // }
      //     // await sendSpeed(throttleCmd)
      //     await dcc.handleMessage(JSON.stringify({ action: 'throttle', payload: throttleCmd }))
    });
  }

  async listen() {
    console.log('DejaCloudService.listen', this.db?.app.name);
    onSnapshot(
      query(
        collection(this.db, `layouts/${this.layoutId}/dccCommands`),
        orderBy('timestamp', 'desc'),
        limit(10),
      ),
      this.handleDccCommands,
    );
    onSnapshot(
      query(
        collection(this.db, `layouts/${this.layoutId}/dejaCommands`),
        orderBy('timestamp', 'desc'),
        limit(10),
      ),
      this.handleDejaCommands,
    );
    onSnapshot(
      query(
        collection(this.db, `layouts/${this.layoutId}/throttles`),
        orderBy('timestamp', 'desc'),
        limit(10),
      ),
      this.handleThrottleCommands,
    );
  }

  async load() {}

  async connect() {
    try {
      this.layoutId = this.configService.get('LAYOUT_ID');
      console.log('Connecting to DejaCloud', this.layoutId);
      this.db = this.firestoreService.getDb();
      // await this.layoutService.reset();
      // await this.layoutService.wipe();
      await this.listen();
      await this.load();
      console.log('Connected to DejaCloud', this.layoutId);
      return true;
    } catch (error) {
      console.error('Error in connect:', error);
    }
  }
}
