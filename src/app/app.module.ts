import { TicketsService } from './pages/tickets/tickets.service';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { UITabsComponent } from './ui-kit/ui-tabs/ui-tabs.component';
import { RESTService } from './providers/rest.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
// import { TicketsModule } from './pages/tickets/tickets.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIKitModule } from './ui-kit/ui-kit.module';
import { AppRoutes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
  ],
  imports: [
    BrowserModule,
    // TicketsModule,
    CommonModule,
    BrowserAnimationsModule,
    UIKitModule,
    AppRoutes,
    HttpClientModule,
  ],
  providers: [
    RESTService,
    TicketsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
