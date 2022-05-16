import * as _ from 'lodash';
import { firestore } from '../../../core/firebase';
import { UserType } from '../../../core/types/enums';
import {
  assertFireSnap,
  resetDb,
  testAuthentication,
  testAuthorization,
  testCreate,
  testUpdate,
  testValidation,
} from '../../test-utils';
import { createVenue, createVenueRequest } from './venue-factory';

resetDb();

const url = '/venues';

describe('venue api', () => {
  describe('create', () => {
    it('authenticates', () => testAuthentication(url));

    it('authorizes', () => testAuthorization(url, [UserType.Admin]));

    it('validates', () =>
      testValidation({
        url,
        authorizedRole: UserType.Admin,
        errorMessages: {
          name: 'Name is required',
          address: 'Address is required',
          venueLocations: 'Venue locations is required',
          venueManagerName: 'Venue manager name is required',
          venueManagerPhone: 'Venue manager phone is required',
          publicContactPhone: 'Public contact phone is required',
          serviceFee: 'Service fee is required',
          cardImage: 'Card Image is required',
          heroImage: 'Card Image is required',
        },
      }));

    it('validates invalid data', () =>
      testValidation({
        url,
        authorizedRole: UserType.Admin,
        data: {
          ageRestriction: -1,
        },
        errorMessages: {
          name: 'Name is required',
          address: 'Address is required',
          venueLocations: 'Venue locations is required',
          venueManagerName: 'Venue manager name is required',
          venueManagerPhone: 'Venue manager phone is required',
          publicContactPhone: 'Public contact phone is required',
          serviceFee: 'Service fee is required',
          cardImage: 'Card Image is required',
          heroImage: 'Card Image is required',
          ageRestriction: 'Age restriction must be greater than or equal to 0',
        },
      }));

    it('creates venue', async () => {
      const requestData = createVenueRequest();
      await testCreate({
        url,
        authorizedRole: UserType.Admin,
        data: {
          ...requestData,
          venueLocations: requestData.venueLocations.map(
            ({ long, lat }) => `${lat},${long}`
          ),
        },
        assertCb: async ({ data }) => assertFireSnap('venues', data),
      });
    });

    it('updates venue', async () => {
      const data = createVenue();
      await firestore.collection('venues').doc(data.id!).set(data);
      const updateData = { name: 'ads' };

      await testUpdate({
        url: `${url}/${data.id}`,
        authorizedRole: UserType.Admin,
        updateData,
        assertCb: async ({ data }) => assertFireSnap('venues', data),
      });
    });
  });
});
