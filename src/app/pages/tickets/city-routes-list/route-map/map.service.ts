import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import ymaps from 'ymaps';

// declare let ymaps: any;

@Injectable()
export class MapService {
  yMapsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  map: any;

  constructor() {
    ymaps.load('https://api-maps.yandex.ru/2.1/?apikey=4463c279-01bd-46d9-8914-d54b7f053704&lang=ru_RU')
      .then((maps) => {
        this.map = maps;
        this.yMapsLoaded.next(true);
      }).catch(err => {
        this.yMapsLoaded.next(false);
      });
  }


}
