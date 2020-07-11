import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UILoaderComponent } from './ui-loader/ui-loader.component';

@NgModule({
  declarations: [
    UILoaderComponent,
  ],
  exports: [
    UILoaderComponent,
  ],
  imports: [
    RouterModule
  ],
  providers: []
})
export class UIKitModule {
}
