import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferTypeGridActionComponent } from './offer-type-grid-action/offer-type-grid-action.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferTypeListComponent } from './offer-type-list/offer-type-list.component';
import { OfferTypeDeleteComponent } from './offer-type-delete/offer-type-delete.component';
import { OfferGridActionComponent } from './offer-grid-action/offer-grid-action.component';
import { OfferDeleteComponent } from './offer-delete/offer-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { OfferMappingListComponent } from './offer-mapping-list/offer-mapping-list.component';
import { OfferMappingGridActionComponent } from './offer-mapping-grid-action/offer-mapping-grid-action.component';
import { OfferMappingDeleteComponent } from './offer-mapping-delete/offer-mapping-delete.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OfferFilterComponent } from './offer-filter/offer-filter.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';


@NgModule({
  declarations: [
    OfferTypeGridActionComponent,
     OfferListComponent, 
     OfferTypeListComponent, 
     OfferTypeDeleteComponent, 
     OfferGridActionComponent, 
     OfferDeleteComponent, OfferMappingListComponent, OfferMappingGridActionComponent, OfferMappingDeleteComponent, OfferFilterComponent, OfferDetailsComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  entryComponents: [
    OfferTypeGridActionComponent,  
     OfferTypeDeleteComponent, 
     OfferGridActionComponent, 
     OfferDeleteComponent,
     OfferMappingGridActionComponent, 
     OfferMappingDeleteComponent,
     OfferDetailsComponent],
})
export class OfferModule { }
