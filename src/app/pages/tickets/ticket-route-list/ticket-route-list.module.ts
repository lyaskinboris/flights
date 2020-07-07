import { UIKitModule } from './../../../ui-kit/ui-kit.module';
import { TicketRouteListComponent } from './ticket-route-list.component';
import { RouteMapComponent } from './route-map/route-map.component';
import { ControlsModule } from './../../../shared/controls/controls.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { TicketRouteComponent } from './ticket-route/ticket-route.component';

const routes: Routes = [
  {
    path: '',
    component: TicketRouteListComponent,
  }
];

@NgModule({
  declarations: [
    TicketRouteListComponent,
    TicketRouteComponent,
    RouteMapComponent,
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
export class TicketListModule {
  public static routes = routes;
}

