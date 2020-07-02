import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';
import { Address } from '../../models/address.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BaseControl } from '../base.control';

@Component({
  selector: 'app-ctrl-autocomplete-address',
  templateUrl: './ctrl-autocomplete-address.component.html',
  styleUrls: ['./ctrl-autocomplete-address.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CtrlAutocompleteAddressComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class CtrlAutocompleteAddressComponent extends BaseControl implements ControlValueAccessor, OnInit {
  @Input() items: Address[];
  @Input() placeholder: string;

  filteredOptions$: Observable<Address[]>;

  myControl = new FormControl();

  value: any;
  isLoadin2g: boolean;

  ngOnInit(): void {
    this.filteredOptions$ = this.getData();
  }

  changeDropdown(value: MatAutocompleteSelectedEvent): void {
    this.value = value;
    this.onChange(value.option.value);
    this.onTouched();
  }

  transform(data: Address): string {
    if (data && data.name) {
      return data.name;
    }
    return '';
  }

  private getData(): Observable<any[]> {
    return this.myControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap((query: string) => {
        return of(this.items);
      })
    );
  }
}
