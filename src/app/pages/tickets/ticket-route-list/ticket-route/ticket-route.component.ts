import { RouteMapComponent } from './../route-map/route-map.component';
import { TicketsService } from './../../tickets.service';
import { Ticket } from './../../ticket.model';
import * as moment from 'moment';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-route',
  templateUrl: './ticket-route.component.html',
  styleUrls: ['./ticket-route.component.scss']
})
export class TicketRouteComponent {
  @Input() ticketRoute: string[] = [];
  open: boolean;

  constructor(public ticketsService: TicketsService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openMap(): void {
    // console.log(JSON.stringify(this.tickets));

    // const dialogRef = this.dialog.open(RouteMapComponent, {
    //   closeOnNavigation: true
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

    this.open = true;
  }

  getCityFromTicket(ticketRoute: string) {
    return this.ticketsService.getAllCities().get(ticketRoute).address.name;
  }

  getTimeFromTicket(ticketRoute: string) {
    return moment(this.ticketsService.getAllCities().get(ticketRoute).time).format('DD.MM.YYYY hh:mm:ss');
  }
}
