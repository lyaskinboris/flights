import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';

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
    this.tickets.push(new Ticket('Tomsk', '6 июля 11:00', 'Москва', '6 июля 15:00'));
    this.tickets.push(new Ticket('Tomsk', '6 июля 11:00', 'Москва', '6 июля 15:00'));
    this.tickets.push(new Ticket('Tomsk', '6 июля 11:00', 'Москва', '6 июля 15:00'));
  }

  addTicket() {

  }
}


