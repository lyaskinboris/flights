import { TicketsService } from './../tickets.service';
import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
// import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-map',
  templateUrl: './ticket-map.component.html',
  styleUrls: ['./ticket-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketMapComponent implements OnInit {

  constructor(
    public ticketsService: TicketsService
  ) {

  }

  ngOnInit() {

  }
}

