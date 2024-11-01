import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable()
export class FirestoreService {
  private app: FirebaseApp = null;
  private db: Firestore = null;

  constructor() {
    console.log('FirestoreService.constructor');
    this.initiazlize();
  }

  initiazlize() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    console.log('Firebase initialized', this.db?.app.name);
  }

  getDb(): Firestore {
    return this.db;
  }
}
