import { Injectable } from '@angular/core';

import { RESTService } from './../../providers/rest.service';
import { Ticket } from './ticket.model';
import { ticketEnum } from '../../shared/enums/ticket.enum';
import { CityData } from '../../shared/models/city-data.model';

@Injectable()
export class TicketsService {
  ticketEnum = ticketEnum;

  private ticketsNeighbors: Map<string, Ticket[]> = new Map();
  private allCities: Map<string, CityData> = new Map();
  private ticketRouters: string[][] = [];
  private tickets: Ticket[] = [];


  constructor(private readonly restService: RESTService) {

  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  getTicketRouters(): string[][] {
    console.log('this.ticketRouters;', this.ticketRouters);
    return this.ticketRouters;
  }

  getAllCities(): Map<string, CityData> {
    return this.allCities;
  }

  setDefaultValue(): void {
  }

  addTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
    this.setGraph(
      ticket.fromCity.address.name,
      ticket
    );
    this.setCities(ticket);
  }

  getAllTickets(): void {
    if (!this.tickets || !this.tickets.length) {
      this.restService.getTickets().subscribe(
        (tickets: Ticket[]) => {
          this.tickets = tickets;
          this.tickets.forEach((
            (ticket: Ticket) => {
              this.setGraph(
                ticket.fromCity.address.name,
                ticket
              );
              console.log('gerte');
              this.setCities(ticket);
            }
          ));
          this.generateAllPaths();
          this.removeDuplicatePaths();
          console.log('check', this.ticketsNeighbors, this.ticketRouters);
        }
      );
    }
  }

  getTicketRoutes(): { cityName: string, fromId: string }[][] {
    return null;
  }

  setGraph(from: string, ticketData: Ticket): void {
    if (!this.ticketsNeighbors.has(from)) {  // Add the edge u -> v.
      this.ticketsNeighbors.set(from, []);
    }
    const item = this.ticketsNeighbors.get(from);
    item.push(ticketData);

    this.ticketsNeighbors.set(from, item);
  }

  generateAllPaths(): void {
    Array.from(this.ticketsNeighbors, ([key, value]) => {
      const toCity = this.ticketsNeighbors.get(value[0].fromCity.address.name) ?
        this.ticketsNeighbors.get(value[0].fromCity.address.name)[0].fromCity : null;

      this.generateFullPaths(
        [value[0].fromCity.id],
        toCity
      );
    });
  }

  generateFullPaths(
    pathCitiesId: string[],
    toCity: CityData
  ): void {

    if (!toCity) {
      this.ticketRouters.push(pathCitiesId);
      return;
    }

    if (this.ticketsNeighbors.has(toCity.address.name)) {
      const setCitiesFromToCity = this.ticketsNeighbors.get(toCity.address.name);

      for (const nextCity of setCitiesFromToCity) {
        if (nextCity.arrivalCity.time > nextCity.fromCity.time) {
          this.generateFullPaths(
            pathCitiesId.concat(nextCity.arrivalCity.id),
            nextCity.arrivalCity
          );
        } else {
          this.ticketRouters.push(pathCitiesId);
        }
      }
    } else {
      this.ticketRouters.push(pathCitiesId);
    }
  }

  removeDuplicatePaths(): void {
    const resultIndex = [];
    this.ticketRouters = this.ticketRouters.sort((a, b) => b.length - a.length);

    this.ticketRouters = this.ticketRouters.map(arrItem => JSON.stringify(arrItem).replace(/[\[\]']+/g, ''))
      .filter((stringValue, id, newArr) => newArr.findIndex(p => p.includes(stringValue)) === id)
      .map(arr => JSON.parse('[' + arr + ']'));

    // .forEach((stringValue, id, newArr) => {
    //   if (newArr.findIndex(p => p.includes(stringValue)) === id) {
    //     resultIndex.push(this.ticketRouters[id]);
    //   }
    // });

    // this.ticketRouters = resultIndex;
  }

  resetArrays(): void {
    // this.tickets = [];
    // this.ticketRouters = [];
    // this.ticketsNeighbors = {};
  }

  setCities(ticket: Ticket) {
    this.allCities.set(ticket.fromCity.id, ticket.fromCity);
    this.allCities.set(ticket.arrivalCity.id, ticket.arrivalCity);
  }
}
