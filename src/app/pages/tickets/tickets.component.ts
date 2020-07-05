import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';
import { Address } from 'src/app/shared/models/address.model';
import { MatDialog } from '@angular/material/dialog';
import { TicketsService } from './tickets.service';
import * as _moment from 'moment';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(public dialog: MatDialog, public ticketsService: TicketsService) {
    this.ticketsService.setDefaultValue();
  }

  ngOnInit(): void {
    this.ticketsService.getAllTickets();
  }

  addTicket(): void {
    const dialogRef = this.dialog.open(TicketCreateComponent, {
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getTimeString(time: _moment.Moment): string {
    return _moment(time).format('DD.MM.YYYY hh:mm:ss');
  }
}


