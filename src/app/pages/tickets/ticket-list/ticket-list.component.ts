import { Utility } from './../../../app.utility';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketsService } from '../tickets.service';
import * as _moment from 'moment';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  constructor(public dialog: MatDialog, public ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    console.log(this.ticketsService.tickets);
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
    return Utility.getDateTimeStringFromMoment(time);
  }

}


