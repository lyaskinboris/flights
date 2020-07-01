import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';
import { Address } from 'src/app/shared/models/address.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this.tickets.push(new Ticket(new Address('Tomsk', 1, 1), '6 июля', '11:00', new Address('Tomsk', 1, 1), '6 июля', '15:00'));
    this.tickets.push(new Ticket(new Address('Novosib', 1, 1), '6 июля', '11:00', new Address('Omsk', 1, 1), '6 июля', '15:00'));
    this.tickets.push(new Ticket(new Address('Kiev', 1, 1), '6 июля', '11:00', new Address('Kemerovo', 1, 1), '6 июля', '15:00'));
  }

  addTicket(): void {
    // fromCity: string, fromTime: string, toCity: string, arrivalTime: string
    // this.tickets.push(new Ticket(fromCity, fromTime, toCity, arrivalTime));
  }

  getFromDateAndTime(ticket: Ticket): string {
    return this.getDateAndTime(ticket.fromDate, ticket.fromTime);
  }

  getArrivalDateAndTime(ticket: Ticket): string {
    return this.getDateAndTime(ticket.arrivalDate, ticket.arrivalTime);
  }

  private getDateAndTime(date: string, time: string): string {
    return date + ' ' + time;
  }
}


