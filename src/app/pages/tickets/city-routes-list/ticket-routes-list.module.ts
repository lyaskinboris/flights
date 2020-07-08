import { UIKitModule } from './../../../ui-kit/ui-kit.module';
import { TicketRoutesListComponent } from './ticket-routes-list.component';
import { RouteMapComponent } from './route-map/route-map.component';
import { ControlsModule } from './../../../shared/controls/controls.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { CityRoutesComponent } from './city-routes/city-routes.component';

const routes: Routes = [
  {
    path: '',
    component: TicketRoutesListComponent,
  }
];

@NgModule({
  declarations: [
    TicketRoutesListComponent,
    RouteMapComponent,
    CityRoutesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    MatDialogModule,
    HttpClientModule,
    UIKitModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    RouteMapComponent,
  ],
})
export class TicketRoutesListModule {
  public static routes = routes;
}

