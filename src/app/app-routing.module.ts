import { TicketsComponent } from './pages/tickets/tickets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketRouteListComponent } from './pages/tickets/ticket-route-list/ticket-route-list.component';

// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  {
    path: '',
    component: TicketsComponent,
    children: [
      { path: '', redirectTo: 'ticket-list', pathMatch: 'full' },
      {
        path: 'ticket-list',
        loadChildren: () => import('./pages/tickets/ticket-list/ticket-list.module').then(x => x.TicketListModule)
      },
      {
        path: 'ticket-route',
        loadChildren: () => import('./pages/tickets/ticket-route-list/ticket-route-list.module').then(x => x.TicketListModule)
      },
      { path: '**', redirectTo: 'ticket-list' },
    ]
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, {
  initialNavigation: 'enabled',
});
