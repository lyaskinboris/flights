import { Component, forwardRef, ViewEncapsulation, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';

import { BaseControl } from '../base.control';
import { dateFormat } from './../../constants';
import { Utility } from './../../../app.utility';
import { dateRegex } from '../../constants';


@Component({
  selector: 'app-ui-datepicker',
  templateUrl: './ctrl-datepicker.component.html',
  styleUrls: ['./ctrl-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CtrlDatepickerComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class CtrlDatepickerComponent extends BaseControl implements ControlValueAccessor {
  @Input() placeholder = 'Дата';
  date;

  writeValue(value: string): void {
    if (value !== this.value) {
      this.value = _moment(value, dateFormat);
      if (dateRegex.test(value)) {
        this.date = this.value.format(dateFormat);
      }
    }

    if (!Utility.hasValue(value)) {
      this.date = '';
    }
  }

  dateValueChanged(value: any ): void {
    if (value && Utility.isMoment(value.value)) {
      this.value = _moment(value.value, dateFormat);
      this.date = _moment(this.value.value).format(dateFormat);
    } else {
      if (dateRegex.test(value)) {
        this.value = _moment(value, dateFormat);
      } else {
        if (value && value.length <= 10) {
          this.value = value;
        }
      }
    }

    this.onChange(this.value);
    this.onTouched();
  }
}
