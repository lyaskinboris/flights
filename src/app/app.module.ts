import { RESTService } from './providers/rest.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { TicketsModule } from './pages/tickets/tickets.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIKitModule } from './ui-kit/ui-kit.module';
import { AppRoutingModule } from './app-routing..module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TicketsModule,
    CommonModule,
    BrowserAnimationsModule,
    UIKitModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    RESTService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
