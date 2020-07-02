import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Address } from '../../shared/models/address.model';

@Injectable()
export class TicketsService {
  tickets: Ticket[] = [];

  setDefaultValue(): void {
    // this.tickets.push(new Ticket({ new Address('Tomsk', 1, 1), '6 июля', '11:00', new Address('Tomsk', 1, 1), '6 июля', '15:00'}));
    // this.tickets.push(new Ticket(new Address('Novosib', 1, 1), '6 июля', '11:00', new Address('Omsk', 1, 1), '6 июля', '15:00'));
    // this.tickets.push(new Ticket(new Address('Kiev', 1, 1), '6 июля', '11:00', new Address('Kemerovo', 1, 1), '6 июля', '15:00'));
  }

  addTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
  }
}
