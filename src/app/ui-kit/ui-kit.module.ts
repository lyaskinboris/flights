import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UILoaderComponent } from './ui-loader/ui-loader.component';
import { UITabsComponent } from './ui-tabs/ui-tabs.component';

@NgModule({
  declarations: [
    UITabsComponent,
    UILoaderComponent,
  ],
  exports: [
    UITabsComponent,
    UILoaderComponent,
  ],
  imports: [
    RouterModule
  ]
})
export class UIKitModule {

}
