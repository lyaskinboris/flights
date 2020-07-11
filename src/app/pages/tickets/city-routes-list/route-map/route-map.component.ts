import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { TicketsService } from './../../tickets.service';
import { MapService } from './map.service';
import { Address } from '../../../../shared/models/address.model';

@Component({
  selector: 'app-route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss'],
  providers: [MapService]
})
export class RouteMapComponent implements OnInit {
  route: string[] = [];

  @ViewChild('yamaps', { static: true }) yandexMap: ElementRef;
  map;

  constructor(
    private readonly mapService: MapService,
    private readonly ticketsService: TicketsService,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {
  }

  ngOnInit(): void {
    this.route = this.data;

    this.mapService.yMapsLoaded.subscribe((value) => {
      if (value) {
        this.map = new this.mapService.map.Map(this.yandexMap.nativeElement, {
          center: [55.76, 37.64],
          zoom: 3,
          controls: ['geolocationControl', 'zoomControl', 'fullscreenControl']
        });
        this.map.container.events.add('fullscreenenter', () => {
          this.dialog.closeAll();
        });
        this.loadPlacemark();
      }
    });
  }

  private loadPlacemark(): void {
    const location: number[][] = [];
    const placemark: {}[] = [];

    this.route.forEach((cityId: string) => {
      const cityAddress: Address = this.ticketsService.mapOfCities.get(cityId).cityData.address;
      const currentLocation = [cityAddress.latitude, cityAddress.longitude];

      location.push(currentLocation);
      placemark.push(new this.mapService.map.Placemark(currentLocation, {
        iconContent: cityAddress.name,
        hintContent: 'Город ' + cityAddress.name
      }, {
        preset: 'islands#nightIcon'
      }));
    });

    const myPolyline = new this.mapService.map.Polyline([
      ...location
    ], {}, {
      strokeColor: '#FF008888',
      hasBalloon: true
    });

    this.map.geoObjects.add(myPolyline);

    placemark.forEach((label) => {
      this.map.geoObjects.add(label);
    });
  }
}
