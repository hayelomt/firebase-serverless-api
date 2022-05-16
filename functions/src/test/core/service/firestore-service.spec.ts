import { expect } from 'chai';
import * as sinon from 'sinon';
import { FirestoreRepo } from '../../../core/repo/firestore-repo';
import FirestoreService from '../../../core/service/firestore-service';

const sandbox = sinon.createSandbox();

const repoMock = {
  createFirestore: sandbox.stub().resolves({ name: 'test' }),
  updateFirestore: sandbox.stub().resolves({ name: 'update' }),
};

class EventService extends FirestoreService {}

afterEach(() => {
  sandbox.restore();
});

describe('firestoreService', () => {
  it('createFirestore filters data and calls repo create function', async () => {
    const dataFilter = (data: any) => ({ name: data.name, trust: data.trust });
    const filterSpy = sandbox.spy(dataFilter);
    const eventService = new EventService(repoMock as unknown as FirestoreRepo);

    expect(repoMock.createFirestore.called).to.be.false;
    expect(filterSpy.called).to.be.false;

    const data = { name: 'eva', trust: true, admin: true };
    const { admin, ...assertData } = data;

    const newData = await eventService.createFirestore(data, filterSpy);

    expect(filterSpy.calledOnce).to.be.true;
    expect(filterSpy.calledWithExactly(data)).to.be.true;
    expect(repoMock.createFirestore.calledOnce).to.be.true;
    expect(repoMock.createFirestore.calledWithExactly(assertData)).to.be.true;
    expect(newData).to.deep.equal({ name: 'test' });
  });

  it('updateFirestore filters data and calls repo update', async () => {
    const dataFilter = (data: any) => ({ name: data.name });
    const filterSpy = sandbox.spy(dataFilter);
    const eventService = new EventService(repoMock as unknown as FirestoreRepo);

    expect(repoMock.updateFirestore.called).to.be.false;
    expect(filterSpy.called).to.be.false;

    const data = { name: 'eva', trust: true, admin: true };
    const { admin, trust, ...assertData } = data;
    const id = 'star';

    const updatedData = await eventService.updateFirestore(id, data, filterSpy);

    expect(filterSpy.calledOnce).to.be.true;
    expect(filterSpy.calledWithExactly(data)).to.be.true;
    expect(repoMock.updateFirestore.calledOnce).to.be.true;
    expect(repoMock.updateFirestore.calledWithExactly(id, assertData)).to.be
      .true;
    expect(updatedData).to.deep.equal({ name: 'update' });
  });
});
