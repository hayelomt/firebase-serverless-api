import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
const serviceKey = require('../../serviceKey.json');

console.log('INITIALIZE APP');

try {
  initializeApp({
    credential: cert(serviceKey),
    databaseURL: process.env.DATABASE_URL,
  });
} catch (_err) {}

const firestore = getFirestore();
const rtdb = getDatabase();
const auth = getAuth();

export { firestore, rtdb, auth };
