import { Address } from '../models/address.model';
import * as moment from 'moment';

export class CityData {
  public address: Address;
  public time: moment.Moment;
  public id: string;
}
