import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Firestore } from 'firebase/firestore';
import { FirestoreService } from '../firestore/firestore.service';
import { LayoutsService } from '../layouts/layouts.service';
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
import { Device } from 'src/layouts/entities/device.entity';

@Injectable()
export class DejaCloudService {
  private db: Firestore = null;
  private layoutId: string = null;

  constructor(
    private configService: ConfigService,
    private firestoreService: FirestoreService,
    private layoutService: LayoutsService,
  ) {
    console.log('DejaCloudService.constructor');
    this.layoutId = this.configService.get('LAYOUT_ID');
    this.db = this.firestoreService.getDb();
    console.log(
      'DejaCloudService.constructor',
      this.db?.app.name,
      this.layoutId,
    );
    this.connect();
  }

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
    const db = this.db;
    const layoutId = this.layoutId;
    onSnapshot(
      query(
        collection(db, `layouts/${layoutId}/dccCommands`),
        orderBy('timestamp', 'desc'),
        limit(10),
      ),
      this.handleDccCommands,
    );
    onSnapshot(
      query(
        collection(db, `layouts/${layoutId}/dejaCommands`),
        orderBy('timestamp', 'desc'),
        limit(10),
      ),
      this.handleDejaCommands,
    );
    onSnapshot(
      query(
        collection(db, `layouts/${layoutId}/throttles`),
        orderBy('timestamp', 'desc'),
        limit(10),
      ),
      this.handleThrottleCommands,
    );
  }

  async load() {
    const layout = await this.loadLayout();
    const devices = await this.loadDevices();
    await this.autoConnect(devices);
    console.log('load', layout, devices);
  }

  async autoConnect(devices: Device[]) {
    devices.map((device: Device) => {
      console.log('Auto connect device', device.autoConnect, {
        device: device.id,
        serial: device.port,
      });
      if (device.autoConnect && device.port) {
        // connectDevice({ device: device.id, serial: device.port })
      }
    });
  }

  async loadLayout() {
    try {
      const layoutRef = doc(this.db, `layouts`, this.layoutId);
      const docSnap = await getDoc(layoutRef);

      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error loading layout', error);
    }
  }

  async loadDevices() {
    try {
      const devices = await collection(
        this.db,
        `layouts/${this.layoutId}/devices`,
      );
      const querySnapshot = await getDocs(devices);
      const devicesData = [];
      querySnapshot.forEach((doc) => {
        devicesData.push({ ...doc.data(), id: doc.id });
      });
      return devicesData;
    } catch (error) {
      console.error('Error loading layout', error);
    }
  }

  async connect() {
    try {
      this.layoutId = this.configService.get('LAYOUT_ID');
      console.log('Connecting to DejaCloud', this.layoutId);
      this.db = this.firestoreService.getDb();
      await this.layoutService.reset();
      await this.layoutService.wipe();
      await this.listen();
      await this.load();
      console.log('Connected to DejaCloud', this.layoutId);
      return true;
    } catch (error) {
      console.error('Error in connect:', error);
    }
  }
}
