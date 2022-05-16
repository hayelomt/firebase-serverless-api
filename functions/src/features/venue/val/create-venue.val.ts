import { check, ValidationChain } from 'express-validator';
import ChainBuilder from '../../../core/util/validator/chain-builder';

const createVenueVal: ValidationChain[] = [
  new ChainBuilder(check('name'), 'Name')
    .required()
    .string()
    .maxString(100)
    .build(),
  new ChainBuilder(check('address'), 'Address')
    .required()
    .string()
    .maxString(100)
    .build(),
  new ChainBuilder(check('venueLocations'), 'Venue locations')
    .required()
    .array()
    .build(),
  new ChainBuilder(check('venueLocations.*'), 'Venue Location')
    .required()
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
    .required()
    .string()
    .maxString(100)
    .build(),
  new ChainBuilder(check('venueManagerPhone'), 'Venue manager phone')
    .required()
    .string()
    .maxString(20)
    .build(),
  // TODO: Phone Validation
  new ChainBuilder(check('publicContactPhone'), 'Public contact phone')
    .required()
    .string()
    .maxString(20)
    .build(),
  new ChainBuilder(check('serviceFee'), 'Service fee')
    .required()
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
  new ChainBuilder(check('cardImage'), 'Card Image').required().build(),
  new ChainBuilder(check('heroImage'), 'Card Image').required().build(),
];

export default createVenueVal;
