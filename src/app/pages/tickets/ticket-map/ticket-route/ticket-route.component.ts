import { TicketsService } from './../../tickets.service';
import { Ticket } from './../../ticket.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-route',
  templateUrl: './ticket-route.component.html',
  styleUrls: ['./ticket-route.component.scss']
})
export class TicketRouteComponent {
  @Input() tickets: Ticket[] = [];

  constructor(public ticketsService: TicketsService) {

  }

  openMap(): void {
    console.log(JSON.stringify(this.tickets));
  }
}
