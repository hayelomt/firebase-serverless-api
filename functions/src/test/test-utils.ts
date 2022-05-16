import axios from 'axios';
import * as faker from 'faker';
import { expect } from 'chai';
import { auth, firestore } from '../core/firebase';
import * as supertest from 'supertest';
import { ApiMethod } from '../core/types/types';
import { UserType } from '../core/types/enums';

const appUrl = 'http://localhost:5001/sample-dev/us-central1/ticketingApiV1';

/**
 * Global Utils
 */
const cleanFirestore = async () => {
  const collectionRefs = await firestore.listCollections();

  for await (const collectionRef of collectionRefs) {
    const docRefs = await collectionRef.listDocuments();
    for await (const docRef of docRefs) {
      await docRef.delete();
    }
  }
};

const resetDb = () => {
  beforeEach(async () => {
    await cleanFirestore();
    await deleteUsers();
  });

  afterEach(async () => {});

  after(async () => {
    await cleanFirestore();
    await deleteUsers();
  });
};

const assertError = async (testCb: Function, assertCb: Function) => {
  let assertedError = false;
  try {
    await testCb();
  } catch (err) {
    await assertCb(err);
    assertedError = true;
  }

  expect(assertedError).to.be.true;
};

/** Assert no timestamp */
const assertNoTS = (newData: any, firestoreSnap: any) => {
  const {
    createdAt: _dcA,
    updatedAt: _duA,
    cts: _dct,
    uts: _dut,
    ...data
  } = newData;
  const { createdAt, updatedAt, cts, uts, ...fireSnap } = firestoreSnap;

  expect(data).to.deep.equal(fireSnap);
};

const randomElement = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateUnauthorizedRole = (blacklistTypes: UserType[]) => {
  const allTypes: UserType[] = Object.values(UserType);
  let generatedType: UserType = randomElement(allTypes);
  while (blacklistTypes.includes(generatedType)) {
    generatedType = randomElement(allTypes);
  }

  return generatedType;
};

const createUser = async (userType: string, email?: string) => {
  const password = 'secret';
  const userEmail = email || faker.internet.email();

  const adminUser = await auth.createUser({
    email: userEmail,
    password,
    displayName: `${faker.name.lastName()}`,
  });

  const userId = adminUser.uid;
  await auth.setCustomUserClaims(userId, {
    userType: `${userType}`,
  });
  const {
    data: { data, token },
  } = (await axios.post(`${appUrl}/auth/login`, {
    email: userEmail,
    password,
  })) as any;

  return { token, email: userEmail, password, userId, user: data.user };
};

const deleteUsers = async () => {
  const { users } = await auth.listUsers(100);
  const deletePromises: Promise<void>[] = [];
  users.forEach((user) => {
    deletePromises.push(auth.deleteUser(user.uid));
  });
  await Promise.all(deletePromises);
};

const assertFireSnap = async (collectionPath: string, responseData: any) => {
  const docs = await firestore.collection(collectionPath).listDocuments();
  expect(docs.length).to.be.greaterThan(0);
  const fireSnap = await docs[0].get();

  expect(responseData.id).to.equal(fireSnap.id);
  assertNoTS(responseData, fireSnap.data());
};

/** Api Utils */
const testAuthentication = async (url: string, method: ApiMethod = 'post') => {
  await supertest(`${appUrl}`)
    [method](url)
    .expect(401)
    .then((res) => {
      expect(res.body).to.deep.equal({
        message: 'Token Not Provided',
        errors: {},
      });
    });
};

const testAuthorization = async (
  url: string,
  authorizedTypes: UserType[],
  method: ApiMethod = 'post'
) => {
  const userRole = generateUnauthorizedRole(authorizedTypes);
  const { token } = await createUser(userRole);

  await supertest(appUrl)
    [method](url)
    .set('Authorization', `Bearer ${token}`)
    .expect(403)
    .then((res) => {
      expect(res.body).to.deep.equal({
        message: 'Un-Authorized',
        errors: {},
      });
    });
};

const testValidation = async ({
  url,
  authorizedRole,
  errorMessages,
  method = 'post',
  data = {},
}: {
  url: string;
  authorizedRole: UserType;
  errorMessages: Record<string, any>;
  method?: 'post' | 'patch';
  data?: Record<string, any>;
}) => {
  const { token } = await createUser(authorizedRole);

  await supertest(appUrl)
    [method](url)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .expect(400)
    .then((res) => {
      expect(res.body).to.deep.equal({
        message: 'Bad Request',
        errors: errorMessages,
      });
    });
};

const testCreate = async ({
  url,
  authorizedRole,
  data,
  assertCb,
}: {
  url: string;
  authorizedRole: UserType;
  data: any;
  assertCb: (data: any) => Promise<void>;
}) => {
  const { token } = await createUser(authorizedRole);

  await supertest(appUrl)
    .post(url)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .expect(201)
    .then(async (res) => {
      await assertCb(res.body);
    });
};

const testUpdate = async ({
  url,
  authorizedRole,
  updateData,
  assertCb,
}: {
  url: string;
  authorizedRole: UserType;
  updateData: any;
  assertCb: (data: any) => Promise<void>;
}) => {
  const { token } = await createUser(authorizedRole);

  await supertest(appUrl)
    .patch(url)
    .set('Authorization', `Bearer ${token}`)
    .send(updateData)
    .expect(200)
    .then(async (res) => {
      await assertCb(res.body);
    });
};

export {
  resetDb,
  assertError,
  assertNoTS,
  assertFireSnap,
  createUser,
  deleteUsers,
  testAuthentication,
  testAuthorization,
  testValidation,
  testCreate,
  testUpdate,
};
