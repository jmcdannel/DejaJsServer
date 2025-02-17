import { Injectable } from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { ConfigService } from '@nestjs/config';
import { type Firestore } from 'firebase/firestore';
import { FirestoreService } from '../firestore/firestore.service';
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
  getFirestore,
} from 'firebase/firestore';

@Injectable()
export class LayoutsService {
  private db: Firestore = null;
  private layoutId: string = null;

  constructor(
    private configService: ConfigService,
    private firestoreService: FirestoreService,
  ) {
    this.layoutId = this.configService.get('LAYOUT_ID');
    this.db = this.firestoreService.getDb();
    console.log('LayoutsService.constructor', this.db?.app.name, this.layoutId);
  }

  create(createLayoutDto: CreateLayoutDto) {
    return 'This action adds a new layout';
  }

  findAll() {
    return `This action returns all layouts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} layout`;
  }

  update(id: number, updateLayoutDto: UpdateLayoutDto) {
    return `This action updates a #${id} layout`;
  }

  async remove(id: number) {
    return `This action removes a #${id} layout`;
  }

  async reset() {
    const querySnapshot = await getDocs(
      collection(this.db, `layouts/${this.layoutId}/devices`),
    );
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        isConnected: false,
        lastConnected: null,
        client: null,
      });
    });
    // await updateDoc(
    //   doc(db, 'layouts', layoutId),
    //   { 'dccEx.lastConnected': null, 'dccEx.client': null },
    //   { merge: true },
    // );
  }

  wipe() {
    const db = this.db;
    const layoutId = this.layoutId;
    async function wipeDcc() {
      const querySnapshot = await getDocs(
        query(
          collection(db, `layouts/${layoutId}/dccCommands`),
          orderBy('timestamp', 'asc'),
        ),
      );
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
    async function wipeDeja() {
      const querySnapshot = await getDocs(
        query(
          collection(db, `layouts/${layoutId}/dejaCommands`),
          orderBy('timestamp', 'asc'),
        ),
      );
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }

    async function wipeThrottles() {
      const querySnapshot = await getDocs(
        query(
          collection(db, `layouts/${layoutId}/throttles`),
          orderBy('timestamp', 'asc'),
        ),
      );
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
    Promise.all([wipeDcc(), wipeDeja(), wipeThrottles()]);
  }
}
