import { TicketsService } from './../tickets.service';
import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ticket-routes-list',
  templateUrl: './ticket-routes-list.component.html',
  styleUrls: ['./ticket-routes-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketRoutesListComponent implements OnInit {

  constructor(
    public ticketsService: TicketsService
  ) {

  }

  ngOnInit() {
  }
}

