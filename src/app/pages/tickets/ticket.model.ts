import { Address } from './../../shared/models/address.model';
export class Ticket {
  public fromCity: Address;
  public fromDate: string;
  public fromTime: string;
  public arrivalCity: Address;
  public arrivalDate: string;
  public arrivalTime: string;

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
