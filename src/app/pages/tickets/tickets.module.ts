import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { RESTService } from './../../providers/rest.service';
import { TicketsService } from './tickets.service';
import { UIKitModule } from './../../ui-kit/ui-kit.module';

@NgModule({
  declarations: [TicketsComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, UIKitModule],
  providers: [RESTService, TicketsService],
})
export class TicketsModule { }