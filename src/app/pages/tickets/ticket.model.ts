import { Address } from './../../shared/models/address.model';
import { CityData } from '../../shared/models/city-data.model';
export class Ticket {
  public fromCity: CityData;
  public arrivalCity: CityData;

  constructor(
    items: object
  ) {
    if (items) {
      Object.assign(
        this, JSON.parse(JSON.stringify(items))
      );
    }
  }
}
