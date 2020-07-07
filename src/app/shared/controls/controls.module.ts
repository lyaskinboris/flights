import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask';


import { CtrlAutocompleteAddressComponent } from './ctrl-autocomplete-address/ctrl-autocomplete-address.component';
import { CtrlDatepickerComponent } from './ctrl-datepicker/ctrl-datepicker.component';
import { CtrlInputComponent } from './ctrl-input/ctrl-input.component';


@NgModule({
  declarations: [
    CtrlAutocompleteAddressComponent,
    CtrlDatepickerComponent,
    CtrlInputComponent,
  ],
  exports: [
    CtrlAutocompleteAddressComponent,
    CtrlDatepickerComponent,
    CtrlInputComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ControlsModule {

}
