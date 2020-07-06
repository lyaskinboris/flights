import { TicketsService } from './../tickets.service';
import { Component, Input, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-route-list',
  templateUrl: './ticket-route-list.component.html',
  styleUrls: ['./ticket-route-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketRouteListComponent implements OnInit {

  constructor(
    public ticketsService: TicketsService
  ) {

  }

  ngOnInit() {

  }
}

