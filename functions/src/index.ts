import * as functions from 'firebase-functions';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../', '.env') });
import './core/firebase';
import app from './core/containers/app';

export const ticketingApiV1 = functions.https.onRequest(app);
