import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TicketsModule } from './pages/tickets/tickets.module';
import { UIMenuComponent } from './ui-kit/ui-menu/ui-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    UIMenuComponent
  ],
  imports: [
    BrowserModule,
    TicketsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
