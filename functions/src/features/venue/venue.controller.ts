import apiUtils from '../../core/api/api-utils';
import VenueFireService from './venue.fire-service';

export default class VenueController {
  constructor(protected service = new VenueFireService()) {}

  create() {
    return apiUtils.createData(this.service);
  }

  update() {
    return apiUtils.updateData(this.service);
  }
}
