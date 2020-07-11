import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Ticket } from './../../../pages/tickets/ticket.model';
import { RESTService } from './../../../providers/rest.service';
import { Address } from '../../models/address.model';
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
  @Input() placeholder: string;

  filteredOptions$: Observable<any[]>;

  myControl = new FormControl();

  value: any;
  isLoadin2g: boolean;

  constructor(private readonly restService: RESTService) {
    super();
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.getData();
  }

  changeDropdown(value: MatAutocompleteSelectedEvent): void {
    this.value = value.option.value.data.city;

    const address: Address = new Address({
      name: value.option.value.data.city,
      longitude: value.option.value.data.geo_lon,
      latitude: value.option.value.data.geo_lat
    });
    console.log(address);
    this.onChange(address);
    this.onTouched();
  }

  transform(data: any): string {
    if (data && data.value) {
      return data.value;
    }
    return '';
  }

  inputChanged(): void {
    if (this.value) {
      this.value = null;
      this.onChange(null);
      this.onTouched();
    }
  }

  private getData(): Observable<any[]> {
    return this.myControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap((query: string) => {
        if (query) {
          return this.restService.getListOfCities(typeof query === 'string' ? query : '')
            .pipe(
              map((value) => value.suggestions)
            );
        }
        return of([]);
      })
    );
  }
}
