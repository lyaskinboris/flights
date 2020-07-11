import * as _moment from 'moment';

import { dateTimeFormat, dateFormat } from './shared/constants';
import { Address } from './shared/models/address.model';

export class Utility {
  static isMoment(value): boolean {
    if (this.hasValue(value)) {
      return _moment.isMoment(value);
    }
    return false;
  }

  static hasValue<T>(value: T): boolean {
    return !this.isEmptyObject(value) || !this.isEmptyArray(value);
  }

  static isEmptyObject<T>(value: T): boolean {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static isEmptyArray(value): boolean {
    return this.isEmpty(value) || value.length === 0;
  }

  static isEmpty(value: any): boolean {
    return typeof value === 'undefined' || value === null || this.isEmptyString(value);
  }

  static isEmptyString(value = ''): boolean {
    return value !== null && this.isString(value) && value.trim().length === 0;
  }

  static isString(value): boolean {
    return typeof value === 'string';
  }

  static isAddress(value: any): boolean {
    // return true;
    return value instanceof Address;
  }

  static isNumber(value): boolean {
    return typeof value === 'number';
  }

  static isBoolean(value): boolean {
    return typeof value === 'boolean';
  }

  static getDateTimeStringFromMoment(value): string {
    if (this.isMoment(value)) {
      return _moment(value).format(dateTimeFormat);
    }
    if (this.isString(value)) {
      return value;
    }
    return '';
  }

  static getDateFromString(value: string): _moment.Moment {
    return _moment(value, dateFormat);
  }

  static getDateTimeFromString(value: string): _moment.Moment {
    return _moment(value, dateTimeFormat);
  }
}
