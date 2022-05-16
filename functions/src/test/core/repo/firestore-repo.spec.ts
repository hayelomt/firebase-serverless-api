import { expect } from 'chai';
import ResourceNotFoundError from '../../../core/errors/resource-not-found-error';
import { firestore } from '../../../core/firebase';
import { FirestoreRepo } from '../../../core/repo/firestore-repo';
import { assertError, assertNoTS, resetDb } from '../../test-utils';

resetDb();

describe('firestoreRepo', () => {
  describe('updateFirestore', () => {
    it('updates data', async () => {
      const data = {
        id: 'xMen',
        name: 'wolverine',
        createdAt: '20',
        cts: 2,
      };
      await firestore.collection('movies').doc('xMen').set(data);
      const repo = new FirestoreRepo(firestore.collection('movies'));

      const newUpdate = await repo.updateFirestore('xMen', { name: 'silver' });

      const fireSnap = (
        await firestore.collection('movies').doc('xMen').get()
      ).data() as any;

      expect(newUpdate.uts).to.exist;
      expect(newUpdate.updatedAt).to.exist;
      assertNoTS(newUpdate, fireSnap);
      assertNoTS({ ...data, name: 'silver', id: 'xMen' }, fireSnap);
    });

    it('update removes undefined', async () => {
      const data = {
        id: 'xMen',
        name: 'wolverine',
        video: 'you',
        createdAt: '20',
        cts: 2,
      };
      await firestore.collection('movies').doc('xMen').set(data);
      const repo = new FirestoreRepo(firestore.collection('movies'));

      const newUpdate = await repo.updateFirestore('xMen', {
        name: undefined,
        video: 'vimeo',
      });

      const fireSnap = (
        await firestore.collection('movies').doc('xMen').get()
      ).data() as any;

      expect(newUpdate.uts).to.exist;
      expect(newUpdate.updatedAt).to.exist;
      assertNoTS(newUpdate, fireSnap);
      assertNoTS({ ...data, video: 'vimeo', id: 'xMen' }, fireSnap);
    });
  });

  describe('createFirestore', () => {
    it('creates data', async () => {
      const data = { name: 'man', frog: true };
      const repo = new FirestoreRepo(firestore.collection('sample'));
      const newData = await repo.createFirestore(data);

      const fireSnap = (
        await firestore
          .collection('sample')
          .doc(newData.id as string)
          .get()
      ).data() as any;

      expect(fireSnap.id).to.exist;
      assertNoTS(newData, fireSnap);
      assertNoTS({ ...data, id: newData.id }, fireSnap);
    });

    it('removes undefined before store', async () => {
      const data = { man: 'logan', frog: true, cash: undefined };
      const { cash, ...assertData } = data;
      const repo = new FirestoreRepo(firestore.collection('sample'));
      const newData = await repo.createFirestore(data);

      const fireSnap = (
        await firestore
          .collection('sample')
          .doc(newData.id as string)
          .get()
      ).data() as any;

      expect(fireSnap.id).to.exist;
      assertNoTS(newData, fireSnap);
      assertNoTS({ ...assertData, id: newData.id }, fireSnap);
    });
  });

  describe('findOne', () => {
    it('returns existing data', async () => {
      const repo = new FirestoreRepo(firestore.collection('sample'));

      const id = 'id';
      await firestore.collection('sample').doc('id').set({
        name: 'hero',
      });

      const data = await repo.findOne(id);
      expect(data).to.deep.equal({
        id,
        name: 'hero',
      });
    });

    it('throws error for non existent data', async () => {
      const repo = new FirestoreRepo(firestore.collection('sample'), 'Sample');

      await assertError(
        async () => repo.findOne('id'),
        (err: any) => {
          expect(err instanceof ResourceNotFoundError).to.be.true;
          const e = err as ResourceNotFoundError;
          expect(e.message).to.equal('Sample not found');
        }
      );
    });
  });
});
