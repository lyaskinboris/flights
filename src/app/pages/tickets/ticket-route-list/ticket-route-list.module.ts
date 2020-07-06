import { TicketRouteListComponent } from './ticket-route-list.component';
import { RouteMapComponent } from './route-map/route-map.component';
import { ControlsModule } from './../../../shared/controls/controls.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AngularYandexMapsModule, IConfig } from 'angular8-yandex-maps';

import { Routes, RouterModule } from '@angular/router';
import { TicketRouteComponent } from './ticket-route/ticket-route.component';

const routes: Routes = [
  {
    path: '',
    component: TicketRouteListComponent,
  }
];

const mapConfig: IConfig = {
  apikey: '4463c279-01bd-46d9-8914-d54b7f053704',
  lang: 'ru_RU',
};

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
    RouterModule.forChild(routes),
    AngularYandexMapsModule.forRoot(mapConfig)
  ],
  entryComponents: [
    RouteMapComponent,
  ],
})
export class TicketListModule {
  public static routes = routes;
}

