import { TicketsComponent } from './pages/tickets/tickets.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/tickets/ticket-list/ticket-list.module').then(x => x.TicketListModule)
      },
      {
        path: 'city-routes-list',
        loadChildren: () => import('./pages/tickets/city-routes-list/ticket-routes-list.module').then(x => x.TicketRoutesListModule)
      },
      { path: '**', redirectTo: '' },
    ]
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
