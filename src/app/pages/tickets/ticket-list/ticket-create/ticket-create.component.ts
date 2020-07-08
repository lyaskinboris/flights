import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

import { dateFormat } from './../../../../shared/constants';
import { Utility } from './../../../../app.utility';
import { Ticket } from '../../ticket.model';
import { TicketsService } from '../../tickets.service';
import { dateTimeFormat } from '../../../../shared/constants';

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
        this.getDateValidator()
      ])],
      fromTime: ['', Validators.compose([
        Validators.required,
        this.getTimeValidator()
      ])],
      arrivalCity: ['', Validators.required],
      arrivalDate: ['', Validators.compose([
        Validators.required,
        this.getDateValidator()
      ])],
      arrivalTime: ['', Validators.compose([
        Validators.required,
        this.getTimeValidator()
      ])],
    });
  }

  createTicket(): void {
    console.log(this.ticketsForm);
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

  getTime(date: moment.Moment, time: string): moment.Moment {
    const dateTime = date.format(dateFormat) + ' ' + time;

    return moment(dateTime, dateTimeFormat);
  }

  getDateValidator(): ValidatorFn {
    const pattern = /^\d{2}.\d{2}.\d{4}$/;
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (Utility.isMoment(control.value)) {
        console.log('зашелел');
        if (control.value.isValid()) {
          return null;
        } else {
          return {
            invalidDate: true
          };
        }
      } else if (Utility.isString(control.value) && control.value.length === 10) {
        if (!pattern.test(control.value)) {
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
            customMessage: 'Некорректно указано время'
          };
        }
        return null;
      }
    };
  }

  getAddressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean | string } | null => {
      console.log('whats', control.value);
      if (!Utility.isAddress(control.value)) {
        return {
          customMessage: 'Не выбран адрес'
        };
      }
      return null;
    };
  }
}


