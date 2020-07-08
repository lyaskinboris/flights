import { RESTService } from './../../providers/rest.service';
import { RouterModule } from '@angular/router';
import { UIKitModule } from './../../ui-kit/ui-kit.module';
import { NgModule } from '@angular/core';
import { TicketsComponent } from './tickets.component';
import { TicketsService } from './tickets.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TicketsComponent],
  imports: [CommonModule, RouterModule, UIKitModule],
  providers: [RESTService, TicketsService],
})
export class TicketsModule { }