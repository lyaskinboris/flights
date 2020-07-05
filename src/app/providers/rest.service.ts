import { Ticket } from './../pages/tickets/ticket.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';


import * as _moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class RESTService {
  constructor(
    private readonly http: HttpClient
  ) {

  }

  getTickets(): Observable<Ticket[]> {
    return of([
      {
        fromCity: {
          name: 'Tomsk',
          longitude: 1,
          latitude: 1
        },
        fromTime: _moment('01-07-2020 11:00:00', 'YYYY-MM-DD HH:mm:ss'),
        arrivalCity: {
          name: 'Omsk',
          longitude: 1,
          latitude: 1
        },
        arrivalTime: _moment('01-07-2020 12:00:00', 'YYYY-MM-DD HH:mm:ss'),
        id: Math.random().toString(16).slice(2),
      },
      {
        fromCity: {
          name: 'Kemerovo',
          longitude: 3,
          latitude: 4
        },
        fromTime: _moment('02.07.2020 11:00:00', 'YYYY-MM-DD HH:mm:ss'),
        arrivalCity: {
          name: 'Erevan',
          longitude: 1,
          latitude: 1
        },
        arrivalTime: _moment('02.07.2020 14:00:00', 'YYYY-MM-DD HH:mm:ss'),
        id: Math.random().toString(16).slice(2),
      },
      {
        fromCity: {
          name: 'Omsk',
          longitude: 2,
          latitude: 2
        },
        fromTime: _moment('03.07.2020 11:00:00', 'YYYY-MM-DD HH:mm:ss'),
        arrivalCity: {
          name: 'Kemerovo',
          longitude: 1,
          latitude: 1
        },
        arrivalTime: _moment('03.07.2020 14:00:00', 'YYYY-MM-DD HH:mm:ss'),
        id: Math.random().toString(16).slice(2),
      },
      {
        fromCity: {
          name: 'Omsk',
          longitude: 2,
          latitude: 2
        },
        fromTime: _moment('04.07.2020 13:00:00', 'YYYY-MM-DD HH:mm:ss'),
        arrivalCity: {
          name: 'Erevan',
          longitude: 1,
          latitude: 1
        },
        arrivalTime: _moment('04.07.2020 15:00:00', 'YYYY-MM-DD HH:mm:ss'),
        id: Math.random().toString(16).slice(2),
      },
      {
        fromCity: {
          name: 'Erevan',
          longitude: 2,
          latitude: 2
        },
        fromTime: _moment('04.07.2020 12:00:00', 'YYYY-MM-DD HH:mm:ss'),
        arrivalCity: {
          name: 'London',
          longitude: 1,
          latitude: 1
        },
        arrivalTime: _moment('04.07.2020 15:00:00', 'YYYY-MM-DD HH:mm:ss'),
        id: Math.random().toString(16).slice(2),
      }
    ]);
  }

  // getListOfCities() {
  //   const header = 
  //   return this.http.post();
  // }

  getData(value: string): Observable<any> {
    if (!value) {
      return of({});
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + environment.dadataAPIKey,
      })
    };
    const body = Object.assign(
      {},
      {
        query: value,
        locations: [{
          country: '*',
          city_type_full: 'город'
        }],
        from_bound: { value: 'city' },
        to_bound: { value: 'city' }
      }
    );
    return this.http.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', body, httpOptions);
  }
}
