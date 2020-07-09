import { Input, Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive()
export class BaseError {
  @Input() control: AbstractControl;

  @Input() dateMessage = 'некорректный формат даты';
  @Input() timeMessage = 'некорректный формат времени';
  @Input() requiredMessage = 'обязательное поле';
  @Input() customMessage = 'некорректный формат поля';

  get message(): string {
    if (this.validate('required')) {
      return this.requiredMessage;
    }
    if (this.validate('invalidDate')) {
      return this.dateMessage;
    }
    if (this.validate('timeMessage')) {
      return this.timeMessage;
    }
    if (this.validate('customMessage')) {
      return this.customMessage;
    }
  }


  private validate(code: string): boolean {
    if (this.control) {
      return this.control.touched && this.control.hasError(code);
    }
    return false;
  }
}
