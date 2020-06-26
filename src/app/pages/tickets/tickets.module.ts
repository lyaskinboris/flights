import { NgModule } from '@angular/core';
import { TicketsComponent } from './tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TicketsComponent,
    TicketComponent,
  ],
  exports: [TicketsComponent],
  imports: [CommonModule, BrowserModule],
  providers: []
})
export class TicketsModule {

}

