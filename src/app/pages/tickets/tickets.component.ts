import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';
import { Address } from 'src/app/shared/models/address.model';
import { MatDialog } from '@angular/material/dialog';
import { TicketsService } from './tickets.service';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
   tickets: Ticket[] = [];

  constructor(public dialog: MatDialog, public ticketsService: TicketsService) {
    this.tickets = this.ticketsService.tickets;
    this.ticketsService.setDefaultValue();
  }

  ngOnInit(): void {

  }

  addTicket(): void {
    const dialogRef = this.dialog.open(TicketCreateComponent, {
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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


