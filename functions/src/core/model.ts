import { FieldValue } from 'firebase-admin/firestore';

export interface Model {
  id?: string;
  createdAt: string;
  updatedAt: string;
  cts: FieldValue;
  uts: FieldValue;
}
