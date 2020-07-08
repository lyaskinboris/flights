import { TicketsService } from './../../tickets.service';
import { Component, OnInit, ViewChild, Input, Inject, ElementRef } from '@angular/core';
import { MapService } from './map.service';
import { first } from 'rxjs/operators';
import { Address } from '../../../../shared/models/address.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {
  }

  ngOnInit(): void {
    console.log('data', this.data);
    this.route = this.data;
    this.mapService.yMapsLoaded.subscribe((value) => {
      if (value) {
        this.map = new this.mapService.map.Map(this.yandexMap.nativeElement, {
          center: [55.76, 37.64],
          zoom: 3,
          controls: ['geolocationControl', 'zoomControl', 'fullscreenControl']
        });
        this.loadPlacemark();
      }
    });
  }

  private loadPlacemark(): void {
    const location: number[][] = [];
    const placemark: {}[] = [];
    this.route.forEach((cityId: string) => {
      const cityAddress: Address = this.ticketsService.mapOfCities.get(cityId).address;
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
