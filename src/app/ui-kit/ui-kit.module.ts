import { NgModule } from '@angular/core';
import { UITabsComponent } from './ui-tabs/ui-tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UITabsComponent,
  ],
  exports: [
    UITabsComponent,
  ],
  imports: [
    RouterModule
  ]
})
export class UIKitModule {

}
