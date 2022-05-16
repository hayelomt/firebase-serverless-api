import * as faker from 'faker';
import { v4 } from 'uuid';
import { Model } from '../../../core/model';
import { CreateVenueDto } from '../../../features/venue/dto/create-venue.dto';
import { getDateTimeNow } from '../../../core/util/date-utils';

export const createVenueRequest = (): CreateVenueDto => ({
  name: faker.lorem.sentence(),
  address: faker.lorem.sentence(),
  venueLocations: [{ lat: 9.3322341, long: 38.4422323 }],
  venueManagerName: faker.lorem.sentence(),
  venueManagerPhone: '911223344',
  publicContactPhone: '911223344',
  serviceFee: faker.datatype.number({ min: 1, max: 1000 }),
  ageRestriction: faker.datatype.number({ min: 1, max: 1000 }),
  otherRestriction: faker.lorem.sentence(),
  standingCapacity: faker.datatype.number({ min: 1, max: 1000 }),
  seatNumberCount: faker.datatype.number({ min: 1, max: 1000 }),
  heroImage: { refPath: '/images', url: 'http://images' },
  cardImage: { refPath: '/images', url: 'http://images' },
  venueImages: [{ refPath: '/images', url: 'http://images' }],
});

export const createVenue = () =>
  ({
    ...createVenueRequest(),
    id: v4(),
    updatedAt: getDateTimeNow(),
    createdAt: getDateTimeNow(),
  } as CreateVenueDto & Model);
