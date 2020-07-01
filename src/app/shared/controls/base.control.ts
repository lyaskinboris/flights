import { ControlValueAccessor } from '@angular/forms';

export class BaseControl implements ControlValueAccessor {
  protected value: any;

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    if (this.value !== value) {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
