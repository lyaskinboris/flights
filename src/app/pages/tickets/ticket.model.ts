import { Address } from './../../shared/models/address.model';
export class Ticket {
  constructor(
    public fromCity: Address,
    public fromDate: string,
    public fromTime: string,
    public arrivalCity: Address,
    public arrivalDate: string,
    public arrivalTime: string
  ) {

  }
}
