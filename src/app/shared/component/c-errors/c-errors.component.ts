import { BaseError } from './base-error';
import { Component } from '@angular/core';
@Component({
  selector: 'app-c-errors',
  templateUrl: './c-errors.component.html',
  styleUrls: ['./c-errors.component.scss'],
})
export class CErrorsComponent extends BaseError {

}
