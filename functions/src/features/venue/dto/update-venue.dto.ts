import { FireFile } from '../../../core/types/types';
import { parseLocation } from '../venue.service';
import { LatLongLocation } from './create-venue.dto';

export interface UpdateVenueDto {
  name?: string;
  address?: string;
  venueLocations?: LatLongLocation[];
  venueManagerName?: string;
  venueManagerPhone?: string;
  publicContactPhone?: string;
  serviceFee?: number;
  ageRestriction?: number;
  otherRestriction?: string;
  standingCapacity?: number;
  seatNumberCount?: number;
  heroImage?: FireFile;
  cardImage?: FireFile;
  venueImages?: FireFile[];
}

export const updateVenueDtoFactory = (data: any): UpdateVenueDto => ({
  name: data.name,
  address: data.address,
  venueLocations: ((data.venueLocations || []) as string[]).map(parseLocation),
  venueManagerName: data.venueManagerName,
  venueManagerPhone: data.venueManagerPhone,
  publicContactPhone: data.publicContactPhone,
  serviceFee: data.serviceFee,
  ageRestriction: data.ageRestriction,
  otherRestriction: data.otherRestriction,
  standingCapacity: data.standingCapacity,
  seatNumberCount: data.seatNumberCount,
  heroImage: data.heroImage,
  cardImage: data.cardImage,
  venueImages: data.venueImages,
});
