import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

import { Utility } from './../../../../app.utility';
import { Ticket } from '../../ticket.model';
import { TicketsService } from '../../tickets.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketCreateComponent implements OnInit {
  ticketsForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    this.ticketsForm = this.fb.group({
      fromCity: ['', Validators.compose([
        Validators.required,
        this.getAddressValidator()
      ])],
      fromDate: ['', Validators.compose([
        Validators.required,
        this.getDateValidator(),
        this.getComprasionDateValidator('arrivalDate', false)
      ])],
      fromTime: ['', Validators.compose([
        Validators.required,
        this.getTimeValidator()
      ])],
      arrivalCity: ['', Validators.required],
      arrivalDate: ['', Validators.compose([
        Validators.required,
        this.getDateValidator(),
        this.getComprasionDateValidator('fromDate', true)
      ])],
      arrivalTime: ['', Validators.compose([
        Validators.required,
        this.getTimeValidator()
      ])],
    });
  }

  createTicket(): void {
    if (this.ticketsForm.invalid) {
      Object.keys(this.ticketsForm.controls).forEach(
        (controlName: string) => {
          this.ticketsForm.get(controlName).markAsDirty();
          this.ticketsForm.get(controlName).markAsTouched();
        }
      );
    } else {
      const ticket: Ticket = {
        fromCity: {
          address: {
            ...this.ticketsForm.get('fromCity').value
          },
          time: this.getTime(this.ticketsForm.get('fromDate').value, this.ticketsForm.get('fromTime').value),
          id: Math.random().toString(16).slice(2)
        },
        arrivalCity: {
          address: {
            ...this.ticketsForm.get('arrivalCity').value
          },
          time: this.getTime(this.ticketsForm.get('arrivalDate').value, this.ticketsForm.get('arrivalTime').value),
          id: Math.random().toString(16).slice(2)
        }
      };

      this.ticketsService.addTicket(ticket, true);
    }
  }

  getTime(date: string, time: string): string {
    return date + ' ' + time;
  }

  getComprasionDateValidator(dateField: string, moreThan: boolean): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let date1 = null;
      let date2 = null;

      if (!this.ticketsForm) {
        return null;
      }

      if (moreThan) {
        date1 = Utility.getDateFromString(c.value);
        date2 = Utility.getDateFromString(this.ticketsForm.get(dateField).value);
      } else {
        date1 = Utility.getDateFromString(this.ticketsForm.get(dateField).value);
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
}


