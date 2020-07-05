import { ControlsModule } from './../../shared/controls/controls.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';


import { TicketsComponent } from './tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { CErrorsComponent } from '../../shared/component/c-errors/c-errors.component';
import { TicketsService } from './tickets.service';
import { TicketMapComponent } from './ticket-map/ticket-map.component';
import { TicketRouteComponent } from './ticket-map/ticket-route/ticket-route.component';
import { RESTService } from '../../providers/rest.service';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketComponent,
    TicketCreateComponent,
    CErrorsComponent,
    TicketMapComponent,
    TicketRouteComponent,
  ],
  exports: [
    TicketsComponent,
    TicketMapComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    MatDialogModule,
    HttpClientModule,
  ],
  entryComponents: [
    TicketCreateComponent
  ],
  providers: [
    TicketsService,
    RESTService,
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU',
    },
    // {
    //   provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    //   useValue: {
    //     useUtc: false
    //   }
    // },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    }
  ]
})
export class TicketsModule {

}

