import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Address } from '../../../shared/models/address.model';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketCreateComponent {
  tickets: FormGroup;
  address: Address[];

  constructor(private fb: FormBuilder) {
    this.tickets = this.fb.group({
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
    console.log(this.tickets, moment(this.tickets.get('fromTime').value, 'MM-DD-YYYY').format());
  }

  // get
}


