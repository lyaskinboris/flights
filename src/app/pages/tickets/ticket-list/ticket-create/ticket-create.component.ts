import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as _moment from 'moment';

import { Utility } from './../../../../app.utility';
import { Ticket } from '../../ticket.model';
import { TicketsService } from '../../tickets.service';

enum formMode {
  'from' = 'from',
  'arrival' = 'arrival'
}

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class TicketCreateComponent implements OnInit {
  ticketsForm: FormGroup;
  mode: formMode;

  get btnTitle(): string {
    switch (this.mode) {
      case formMode.from:
        return 'Продолжить оформление';
      case formMode.arrival:
        return 'Создать билет';
      default:
        break;
    }
  }

  constructor(
    private fb: FormBuilder,
    private ticketsService: TicketsService,
  ) { }

  ngOnInit(): void {
    this.ticketsForm = this.fb.group({
      from: this.fb.group({
        city: ['', Validators.compose([
          Validators.required,
          this.getAddressValidator()
        ])],
        date: ['', Validators.compose([
          Validators.required,
          this.getDateValidator(),
          this.getComprasionDateValidator('arrival', false)
        ])],
        time: ['', Validators.compose([
          Validators.required,
          this.getTimeValidator()
        ])],
      }),
      arrival: this.fb.group({
        city: ['', Validators.required],
        date: ['', Validators.compose([
          Validators.required,
          this.getDateValidator(),
          this.getComprasionDateValidator('from', true)
        ])],
        time: ['', Validators.compose([
          Validators.required,
          this.getTimeValidator()
        ])],
      })
    });

    this.mode = formMode.from;
  }

  createTicket(): void {
    switch (this.mode) {
      case formMode.from:
        if (this.ticketsForm.get('from').valid) {
          this.mode = formMode.arrival;
        } else {
          this.markTouchedAndDirty('from');
        }
        break;
      case formMode.arrival:
        if (this.ticketsForm.get('arrival').valid) {
          if (this.ticketsForm.invalid) {
            Swal.fire('Форма не заполнена', 'Заполните полностью раздел откуда!', 'error')
          }
          this.addNewTicket();
        } else {
          this.markTouchedAndDirty('arrival');
        }
        break;
      default:
        break;
    }
  }

  getTime(date: string, time: string): string {
    return date + ' ' + time;
  }

  changeMode(mode: string): void {
    switch (mode) {
      case formMode.from:
        this.mode = formMode.from;
        break;
      case formMode.arrival:
        this.mode = formMode.arrival;
        break;
      default:
        break;
    }
  }

  getComprasionDateValidator(fieldGroup: string, moreThan: boolean): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let date1 = null;
      let date2 = null;

      if (!this.ticketsForm) {
        return null;
      }

      if (moreThan) {
        date1 = Utility.getDateFromString(c.value);
        date2 = Utility.getDateFromString(this.ticketsForm.get(fieldGroup).get('date').value);
      } else {
        date1 = Utility.getDateFromString(this.ticketsForm.get(fieldGroup).get('date').value);
        date2 = Utility.getDateFromString(c.value);
      }

      if (date1 !== null && date2 !== null && date1.valueOf() < date2.valueOf()) {
        return { customMessage: true };
      }

      return null;
    };
  }

  getDateValidator(): ValidatorFn {
    const pattern = /^\d{2}.\d{2}.\d{4}$/;
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (Utility.isMoment(control.value)) {
        if (control.value.isValid()) {
          return null;
        } else {
          return {
            invalidDate: true
          };
        }
      } else if (Utility.isString(control.value) && control.value.length === 10) {
        const date = Utility.getDateFromString(control.value);
        if (!date.isValid()) {
          return {
            invalidDate: true
          };
        }
        return null;
      } else {
        return {
          invalidDate: true
        };
      }
    };
  }

  getTimeValidator(): ValidatorFn {
    const pattern = /^\d{2}:\d{2}$/;
    return (control: AbstractControl): { [key: string]: boolean | string } | null => {
      if (Utility.isString(control.value) && control.value.length === 5) {
        if (!pattern.test(control.value)) {
          return {
            timeMessage: true
          };
        }
        return null;
      }
    };
  }

  getAddressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean | string } | null => {
      if (!Utility.isAddress(control.value)) {
        return {
          customMessage: true
        };
      }
      return null;
    };
  }

  private markTouchedAndDirty(groupName: string) {
    const form: FormGroup = this.ticketsForm.controls[groupName] as FormGroup;
    for (const controlName in form.controls) {
      if (controlName) {
        form.controls[controlName].markAsDirty();
        form.controls[controlName].markAsTouched();
      }
    }
  }

  private addNewTicket(): void {
    const ticket: Ticket = {
      fromCity: {
        address: {
          ...this.ticketsForm.get('from.city').value
        },
        time: this.getTime(this.ticketsForm.get('from.date').value, this.ticketsForm.get('from.time').value),
        id: Math.random().toString(16).slice(2)
      },
      arrivalCity: {
        address: {
          ...this.ticketsForm.get('arrival.city').value
        },
        time: this.getTime(this.ticketsForm.get('arrival.date').value, this.ticketsForm.get('arrival.time').value),
        id: Math.random().toString(16).slice(2)
      }
    };

    this.ticketsService.addTicket(ticket, true);
  }
}


