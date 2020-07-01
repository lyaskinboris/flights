import { Component, forwardRef, ViewEncapsulation, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControl } from '../base.control';


@Component({
  selector: 'app-ctrl-input',
  templateUrl: './ctrl-input.component.html',
  styleUrls: ['./ctrl-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CtrlInputComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class CtrlInputComponent extends BaseControl implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() readonly = false;
  @Input() error;

  value;
  disabled = false;

  changeValue(value): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
