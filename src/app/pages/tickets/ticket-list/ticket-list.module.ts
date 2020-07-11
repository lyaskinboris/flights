import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { Routes, RouterModule } from '@angular/router';


import { TicketListComponent } from './ticket-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { CErrorsComponent } from '../../../shared/component/c-errors/c-errors.component';
import { ControlsModule } from './../../../shared/controls/controls.module';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
  }
];

@NgModule({
  declarations: [
    TicketComponent,
    TicketCreateComponent,
    CErrorsComponent,
    TicketListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    TicketCreateComponent,
  ],
  providers: [
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    }
  ]
})
export class TicketListModule {
  public static routes = routes;
}

