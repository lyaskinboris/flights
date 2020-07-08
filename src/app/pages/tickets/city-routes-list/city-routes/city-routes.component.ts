import { RouteMapComponent } from '../route-map/route-map.component';
import { TicketsService } from '../../tickets.service';
import { Ticket } from '../../ticket.model';
import * as moment from 'moment';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Utility } from '../../../../app.utility';

@Component({
  selector: 'app-city-routes',
  templateUrl: './city-routes.component.html',
  styleUrls: ['./city-routes.component.scss']
})
export class CityRoutesComponent {
  @Input() ticketRoute: string[] = [];
  open: boolean;

  constructor(public ticketsService: TicketsService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openMap(): void {
    // console.log(JSON.stringify(this.tickets));

    const dialogRef = this.dialog.open(RouteMapComponent, {
      closeOnNavigation: true,
      data: this.ticketRoute,
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.open = true;
  }

  getCityFromTicket(ticketRoute: string): string {
    return this.ticketsService.mapOfCities.get(ticketRoute).address.name;
  }

  getTimeFromTicket(ticketRoute: string): string {
    return Utility.getDateTimeStringFromMoment(this.ticketsService.mapOfCities.get(ticketRoute).time);
  }
}
