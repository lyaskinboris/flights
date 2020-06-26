import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  @Input() fromCity: string;
  @Input() fromTime: string;
  @Input() toCity: string;
  @Input() arrivalTime: string;

}


