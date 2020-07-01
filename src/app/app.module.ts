import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { TicketsModule } from './pages/tickets/tickets.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIKitModule } from './ui-kit/ui-kit.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
