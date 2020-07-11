import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RouteMapComponent } from '../route-map/route-map.component';
import { TicketsService } from '../../tickets.service';

@Component({
  selector: 'app-city-routes',
  templateUrl: './city-routes.component.html',
  styleUrls: ['./city-routes.component.scss']
})
export class CityRoutesComponent {
  @Input() ticketRoute: string[] = [];
  open: boolean;

  constructor(public ticketsService: TicketsService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openMap(): void {
    const dialogRef = this.dialog.open(RouteMapComponent, {
      closeOnNavigation: true,
      data: this.ticketRoute,
      width: '100%',
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this.open = true;
  }

  getCityName(ticketRoute: string): string {
    return this.ticketsService.mapOfCities.get(ticketRoute).cityData.address.name;
  }

  getTimeFrom(ticketRoute: string): string {
    return this.ticketsService.mapOfCities.get(ticketRoute).fromTime;
  }

  getTimeArrival(ticketRoute: string): string {
    return this.ticketsService.mapOfCities.get(ticketRoute).arrivalTime;
  }
}
