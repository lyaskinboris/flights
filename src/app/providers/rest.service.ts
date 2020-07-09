import { Ticket } from './../pages/tickets/ticket.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class RESTService {
  constructor(
    private readonly http: HttpClient
  ) {

  }

  getTickets(): Observable<Ticket[]> {
    return of([
      {
        fromCity: {
          address: {
            name: 'Томск',
            longitude: 84.948197,
            latitude: 56.48468
          },
          time: '01.07.2020 11:00',
          id: Math.random().toString(16).slice(2),
        },
        arrivalCity: {
          address: {
            name: 'Омск',
            longitude: 73.3674517,
            latitude: 54.9848566
          },
          time: '01.07.2020 12:00',
          id: Math.random().toString(16).slice(2),
        },
      },
      {
        fromCity: {
          address: {
            name: 'Кемерово',
            longitude: 86.0467781,
            latitude: 55.3910651
          },
          time: '02.07.2020 11:00',
          id: Math.random().toString(16).slice(2),
        },
        arrivalCity: {
          address: {
            name: 'Ереван',
            longitude: 44.51361,
            latitude: 40.18111
          },
          time: '02.07.2020 14:00',
          id: Math.random().toString(16).slice(2),
        },
      },
      {
        fromCity: {
          address: {
            name: 'Омск',
            longitude: 73.3674517,
            latitude: 54.9848566
          },
          time: '03.07.2020 11:00',
          id: Math.random().toString(16).slice(2),
        },
        arrivalCity: {
          address: {
            name: 'Кемерово',
            longitude: 86.0467781,
            latitude: 55.3910651
          },
          time: '03.07.2020 14:00',
          id: Math.random().toString(16).slice(2),
        },
      },
      {
        fromCity: {
          address: {
            name: 'Омск',
            longitude: 73.3674517,
            latitude: 54.9848566
          },
          time: '04.07.2020 13:00',
          id: Math.random().toString(16).slice(2),
        },
        arrivalCity: {
          address: {
            name: 'Ереван',
            longitude: 44.51361,
            latitude: 40.18111
          },
          time: '04.07.2020 15:00',
          id: Math.random().toString(16).slice(2),
        },
      },
      {
        fromCity: {
          address: {
            name: 'Ереван',
            longitude: 44.51361,
            latitude: 40.18111
          },
          time: '04.07.2020 12:00',
          id: Math.random().toString(16).slice(2),
        },
        arrivalCity: {
          address: {
            name: 'Лондон',
            longitude: -0.12574,
            latitude: 51.50853
          },
          time: '05.07.2020 15:00',
          id: Math.random().toString(16).slice(2),
        },
      }
    ]);
  }

  getListOfCities(value: string): Observable<any> {
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
