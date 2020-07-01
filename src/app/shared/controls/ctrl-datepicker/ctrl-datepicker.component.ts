import { Component, forwardRef, ViewEncapsulation, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { BaseControl } from '../base.control';


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

  value;
  disabled = false;

  dateValueChanged(e): void {
    this.value = _moment(e.value).format('DD.MM.YYYY');
    this.onChange(this.value);
    this.onTouched();
  }

}
