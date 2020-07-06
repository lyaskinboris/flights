import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from './map.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-route-map',
  templateUrl: 'route-map.component.html',
  styleUrls: ['route-map.component.scss'],
  providers: [MapService]
})
export class RouteMapComponent implements OnInit {
  @ViewChild('yamaps', { static: false }) yandexMap;
  map;

  constructor(private readonly mapService: MapService) {

  }

  ngOnInit(): void {
    this.mapService.yMapsLoaded.pipe(first()).subscribe((value) => {
      console.log('check', value);
      if (value) {
        this.map = new this.mapService.map.Map(this.yandexMap.nativeElement, {
          center: [55.76, 37.64],
          zoom: 3,
          controls: ['geolocationControl', 'zoomControl', 'fullscreenControl']
        });
        this.loadMap();
      }
    });
  }

  private loadMap() {
    // Создаем ломаную.
    const myPolyline = new this.mapService.map.Polyline([
      // Указываем координаты вершин.
      [70, 20],
      [70, 40],
      [90, 15],
      [70, -10]
    ], {}, {
      // Задаем опции геообъекта.
      // Цвет с прозрачностью.
      strokeColor: '#FF008888',
      hasBalloon: true
    });

    const myPlacemark1 = new this.mapService.map.Placemark([70, 20], {}, {
      preset: 'twirl#redIcon'
    });
    const myPlacemark2 = new this.mapService.map.Placemark([70, 40], {}, {
      preset: 'twirl#redIcon'
    });
    const myPlacemark3 = new this.mapService.map.Placemark([90, 15], {}, {
      preset: 'twirl#redIcon'
    });

    this.map.geoObjects.add(myPolyline).add(myPlacemark1).add(myPlacemark2).add(myPlacemark3);
  }
}
