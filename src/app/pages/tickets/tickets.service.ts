import { RESTService } from './../../providers/rest.service';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Address } from '../../shared/models/address.model';
import { ticketEnum } from '../../shared/enums/ticket.enum';

@Injectable()
export class TicketsService {
  ticketEnum = ticketEnum;
  ticketRouters: { cityName: string, fromId: string }[][] = [];
  // citiesNode: Map<string, Ticket> = new Map();
  ticketsNeighbors: Map<string, { city: string, fromDate: number, arrivalDate: number, fromId: string }[]> = new Map();

  private tickets: Ticket[] = [];


  constructor(private readonly restService: RESTService) {

  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  setDefaultValue(): void {
  }

  addTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
  }

  getAllTickets(): void {
    if (!this.tickets || !this.tickets.length) {
      this.restService.getTickets().subscribe(
        (tickets: Ticket[]) => {
          this.tickets = tickets;
          this.tickets.forEach((
            (ticket: Ticket) => {
              this.setGraph(ticket.fromCity.name,
                {
                  city: ticket.arrivalCity.name,
                  fromDate: +ticket.fromTime.valueOf(),
                  arrivalDate: +ticket.arrivalTime.valueOf(),
                  fromId: ticket.id
                }
              );
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
    return this.ticketRouters;
  }

  setGraph(from: string, to: { fromId: string, city: string, fromDate: number, arrivalDate: number }): void {
    if (!this.ticketsNeighbors.has(from)) {  // Add the edge u -> v.
      this.ticketsNeighbors.set(from, []);
    }
    const item = this.ticketsNeighbors.get(from);
    item.push(to);

    this.ticketsNeighbors.set(from, item);
  }

  generateAllPaths(): void {
    Array.from(this.ticketsNeighbors, ([key, value]) => {
      this.generateFullPaths([{ cityName: key, fromId: value[0].fromId }], null);
    });
  }

  generateFullPaths(
    pathCities: { cityName: string, fromId: string }[],
    toCity: { city: string, fromDate: number, arrivalDate: number }
  ): void {
    if (!toCity) {
      toCity = { city: pathCities[0].cityName, fromDate: null, arrivalDate: null };
    }

    if (this.ticketsNeighbors.has(toCity.city)) {
      const setCitiesFromToCity = this.ticketsNeighbors.get(toCity.city);

      if (pathCities[pathCities.length - 1].fromId === null) {
        pathCities[pathCities.length - 1].fromId = setCitiesFromToCity[0].fromId;
      }

      for (const nextCity of setCitiesFromToCity) {
        if (nextCity.arrivalDate > nextCity.fromDate) {
          this.generateFullPaths(pathCities.concat({ cityName: nextCity.city, fromId: null }), nextCity);
        } else {
          this.ticketRouters.push(pathCities);
        }
      }
    } else {
      this.ticketRouters.push(pathCities);
    }
  }

  removeDuplicatePaths(): void {
    this.ticketRouters = this.ticketRouters
      .sort((a, b) => b.length - a.length)
      .map(arrItem => JSON.stringify(arrItem).replace(/[\[\]']+/g, ''))
      .filter((stringValue, id, newArr) => newArr.findIndex(p => p.includes(stringValue)) === id)
      .map(arr => JSON.parse('[' + arr + ']'));
  }

  resetArrays(): void {
    this.tickets = [];
    this.ticketRouters = [];
    // this.ticketsNeighbors = {};
  }
}
