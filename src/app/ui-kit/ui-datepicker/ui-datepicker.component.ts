import { Component, forwardRef, ViewEncapsulation, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';


@Component({
  selector: 'app-ui-datepicker',
  templateUrl: './ui-datepicker.component.html',
  styleUrls: ['./ui-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UIDatepickerComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class UIDatepickerComponent implements ControlValueAccessor {
  // @Input() formControlName: string;
  @Input() placeholder = 'Дата';

  value;
  disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string): void {
    // получить из Forms API
    console.log('что тут', outsideValue);
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  dateValueChanged(e): void {
    // this.value = this.value.format(this.value, 'DD.MM.YYYY');
    this.value = _moment(e.value).format('DD.MM.YYYY');
    this.onChange(this.value);
  }

  // updateValue(insideValue: number) {
  //   this.value = insideValue; // html
  //   this.onChange(insideValue); // уведомить Forms API
  //   this.onTouched();
  // }

}
