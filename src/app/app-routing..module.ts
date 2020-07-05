import { TicketsComponent } from './pages/tickets/tickets.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketMapComponent } from './pages/tickets/ticket-map/ticket-map.component';

// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'ticket-map', component: TicketMapComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }