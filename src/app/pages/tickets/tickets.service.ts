import { Injectable } from '@angular/core';

import { Ticket } from './ticket.model';
import { CityData } from '../../shared/models/city-data.model';
import { Utility } from './../../app.utility';

interface TicketCity {
  cityData: CityData;
  fromTime: string;
  arrivalTime: string;
}

@Injectable()
export class TicketsService {

  private cityNeighbors: Map<string, Ticket[]> = new Map();
  // tslint:disable-next-line: variable-name
  private _mapOfCities: Map<string, TicketCity> = new Map();
  // tslint:disable-next-line: variable-name
  private _cityRoutes: string[][] = [];
  // tslint:disable-next-line: variable-name
  private _tickets: Ticket[] = [];

  get tickets(): Ticket[] {
    return this._tickets;
  }

  get cityRoutes(): string[][] {
    return this._cityRoutes;
  }

  get mapOfCities(): Map<string, TicketCity> {
    return this._mapOfCities;
  }


  constructor() {
  }

  addTickets(tickets: Ticket[]): void {
    tickets.forEach((
      (ticket: Ticket) => {
        this.addTicket(ticket);
      }
    ));
    this.generateAllPaths();
  }

  addTicket(ticket: Ticket, generateNewPaths?: boolean): void {
    this.tickets.push(ticket);
    this.setGraph(
      ticket.fromCity.address.name,
      ticket
    );

    this.processCitiesOfTicket(ticket);

    if (generateNewPaths) {
      this.generateAllPaths();
    }
  }

  private processCitiesOfTicket(ticket: Ticket): void {
    this.setCities(ticket);
  }

  private setGraph(from: string, ticketData: Ticket): void {
    if (!this.cityNeighbors.has(from)) {
      this.cityNeighbors.set(from, []);
    }
    const cities = this.cityNeighbors.get(from);
    cities.push(ticketData);

    this.cityNeighbors.set(from, cities);
  }

  private generateAllPaths(): void {
    this._cityRoutes = [];

    Array.from(this.cityNeighbors, ([key, value]) => {
      const toCity = this.cityNeighbors.get(value[0].fromCity.address.name) ?
        this.cityNeighbors.get(value[0].fromCity.address.name)[0].fromCity : null;

      this.generatePath(
        [value[0].fromCity.id],
        toCity,
        toCity.time,
        toCity.id
      );
    });

    this._cityRoutes = this._cityRoutes.sort((a, b) => b.length - a.length);
  }

  private generatePath(
    pathCitiesId: string[],
    toCity: CityData,
    fromCityTime: string,
    fromCityId: string
  ): void {

    if (!toCity) {
      this._cityRoutes.push(pathCitiesId);
      return;
    }

    if (this.cityNeighbors.has(toCity.address.name)) {
      const setCitiesFromToCity = this.cityNeighbors.get(toCity.address.name);
      for (const nextCity of setCitiesFromToCity) {
        if (Utility.getDateTimeFromString(nextCity.arrivalCity.time).valueOf() > Utility.getDateTimeFromString(fromCityTime).valueOf()) {
          if (!this._mapOfCities.get(fromCityId).fromTime) {
            this._mapOfCities.get(fromCityId).fromTime = nextCity.fromCity.time;
          }
          if (!this._mapOfCities.get(fromCityId).arrivalTime) {
            this._mapOfCities.get(fromCityId).arrivalTime = nextCity.arrivalCity.time;
          }
          this.generatePath(
            pathCitiesId.concat(nextCity.arrivalCity.id),
            nextCity.arrivalCity,
            nextCity.arrivalCity.time,
            nextCity.arrivalCity.id
          );
        } else {
          this._cityRoutes.push(pathCitiesId);
        }
      }
    } else {
      this._cityRoutes.push(pathCitiesId);
    }
  }

  private setCities(ticket: Ticket): void {
    this._mapOfCities.set(
      ticket.fromCity.id,
      {
        cityData: ticket.fromCity,
        fromTime: null,
        arrivalTime: null
      }
    );

    this._mapOfCities.set(
      ticket.arrivalCity.id,
      {
        cityData: ticket.arrivalCity,
        fromTime: null,
        arrivalTime: null
      }
    );
  }
}
