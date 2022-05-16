import { expect } from 'chai';
import { removeUndefined } from '../../../core/util/utility';

describe('utility', () => {
  describe('removeUndefined', () => {
    it('removes undefined fields', () => {
      const data = {
        id: 1,
        name: 'titan',
        location: [1, 2, 3],
        accept: true,
        sand: null,
        track: undefined,
        glass: 'glass',
        rock: undefined,
      };
      const { rock, track, ...assertData } = data;

      expect(removeUndefined(data)).to.deep.equal(assertData);
    });

    it('preserves valid data', () => {
      const data = {
        id: 1,
        name: 'titan',
        location: [1, 2, 3],
        accept: true,
        sand: null,
      };

      const assertData = { ...data };

      expect(removeUndefined(data)).to.deep.equal(assertData);
    });
  });
});
