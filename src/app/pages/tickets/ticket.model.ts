import { Address } from './../../shared/models/address.model';
export class Ticket {
  public fromCity: Address;
  public fromTime: moment.Moment;
  public arrivalCity: Address;
  public arrivalTime: moment.Moment;
  public id: string;
// тут будет объект с готовым дата + время (слитое)

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
