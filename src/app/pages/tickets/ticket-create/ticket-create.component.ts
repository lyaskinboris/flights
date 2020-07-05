import { Ticket } from './../ticket.model';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Address } from '../../../shared/models/address.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketCreateComponent implements OnInit {
  ticketsForm: FormGroup;
  address: Address[];

  constructor(private fb: FormBuilder, private ticketsService: TicketsService) {

  }

  ngOnInit(): void {
    this.ticketsForm = this.fb.group({
      fromCity: ['', Validators.required],
      fromDate: ['', Validators.required],
      fromTime: ['', Validators.required],
      arrivalCity: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
    });

    this.address = [
      new Address('Tomsk', 1, 1),
      new Address('Omsk', 2, 2),
      new Address('Kemerovo', 3, 4),
    ];
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

      const ticket = {
        fromCity: this.ticketsForm.get('fromCity').value,
        fromTime: this.getTime(this.ticketsForm.get('fromDate').value, this.ticketsForm.get('fromTime').value),
        arrivalCity: this.ticketsForm.get('arrivalCity').value,
        arrivalTime: this.getTime(this.ticketsForm.get('fromDate').value, this.ticketsForm.get('fromTime').value),
        id: Math.random().toString(16).slice(2)
      };

      this.ticketsService.addTicket(new Ticket({ ...ticket }));
    }
  }

  getTime(date: string, time: string): moment.Moment {
    return moment(date + ' ' + time, 'DD.MM.YYYY hh:mm:ss');
  }
}


