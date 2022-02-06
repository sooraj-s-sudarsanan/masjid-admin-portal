import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryGridActionComponent } from './country-grid-action/country-grid-action.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDeleteComponent } from './country-delete/country-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';


@NgModule({
  declarations: [CountryGridActionComponent, CountryListComponent, CountryDeleteComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [CountryGridActionComponent, CountryDeleteComponent]
})
export class CountryModule { }
