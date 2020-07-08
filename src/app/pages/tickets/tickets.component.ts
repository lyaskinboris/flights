// import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _moment from 'moment';

import { Ticket } from './ticket.model';
import { RESTService } from '../../providers/rest.service';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  template: `
    <div class="container">
      <div class="content">
        <app-ui-tabs></app-ui-tabs>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class TicketsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private readonly restService: RESTService,
    private readonly ticketsService: TicketsService
  ) {
  }

  ngOnInit(): void {
    console.log('whats', this.ticketsService.tickets);
    if (!this.ticketsService.tickets || !this.ticketsService.tickets.length) {
      console.log('pfitk');
      this.getAllTickets();
    }
  }

  getAllTickets(): void {
    this.restService.getTickets().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (tickets: Ticket[]) => {
        console.log('data', tickets, this.ticketsService.tickets);
        this.ticketsService.addTickets(tickets);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
}

