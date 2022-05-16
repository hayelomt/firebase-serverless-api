import { check, ValidationChain } from 'express-validator';
import ChainBuilder from '../../../core/util/validator/chain-builder';

const updateVenueVal: ValidationChain[] = [
  new ChainBuilder(check('name'), 'Name')
    .optional()
    .string()
    .maxString(100)
    .build(),
  new ChainBuilder(check('address'), 'Address')
    .optional()
    .string()
    .maxString(100)
    .build(),
  new ChainBuilder(check('venueLocations'), 'Venue locations')
    .optional()
    .array()
    .build(),
  new ChainBuilder(check('venueLocations.*'), 'Venue Location')
    .optional()
    .location()
    .build(),
  new ChainBuilder(check('searNumberCount'), 'Seat number count')
    .optional()
    .integer()
    .intGt(0)
    .build(),
  new ChainBuilder(check('standingCapacity'), 'Seat number count')
    .optional()
    .integer()
    .intGte(0)
    .build(),
  new ChainBuilder(check('venueManagerName'), 'Venue manager name')
    .optional()
    .string()
    .maxString(100)
    .build(),
  new ChainBuilder(check('venueManagerPhone'), 'Venue manager phone')
    .optional()
    .string()
    .maxString(20)
    .build(),
  new ChainBuilder(check('publicContactPhone'), 'Public contact phone')
    .optional()
    .string()
    .maxString(20)
    .build(),
  new ChainBuilder(check('serviceFee'), 'Service fee')
    .optional()
    .number()
    .numberGte(0)
    .build(),
  new ChainBuilder(check('ageRestriction'), 'Age restriction')
    .optional()
    .integer()
    .intGte(0)
    .build(),
  new ChainBuilder(check('otherRestriction'), 'Other restriction')
    .optional()
    .string()
    .maxString(2000)
    .build(),
  new ChainBuilder(check('cardImage'), 'Card Image').optional().build(),
  new ChainBuilder(check('heroImage'), 'Hero Image').optional().build(),
];

export default updateVenueVal;
