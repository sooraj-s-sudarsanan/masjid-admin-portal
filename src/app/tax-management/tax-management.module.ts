import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxManagementRoutingModule } from './tax-management-routing.module';
import { TaxTypeListComponent } from './tax-type/tax-type-list/tax-type-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { CoreModule } from '../core/core.module';
import { TaxTypeDeleteComponent } from './tax-type/tax-type-delete/tax-type-delete.component';
import { TaxTypeGridActionComponent } from './tax-type/tax-type-grid-action/tax-type-grid-action.component';
import { TaxComponentsListComponent } from './tax-components/tax-components-list/tax-components-list.component';
import { TaxComponentsGridActionComponent } from './tax-components/tax-components-grid-action/tax-components-grid-action.component';
import { TaxComponentsDeleteComponent } from './tax-components/tax-components-delete/tax-components-delete.component';
import { TaxServiceMappingGridActionComponent } from './tax-service-mapping/tax-service-mapping-grid-action/tax-service-mapping-grid-action.component';
import { TaxServiceMappingListComponent } from './tax-service-mapping/tax-service-mapping-list/tax-service-mapping-list.component';
import { TaxServiceMappingDeleteComponent } from './tax-service-mapping/tax-service-mapping-delete/tax-service-mapping-delete.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxServiceMappingDetailsComponent } from './tax-service-mapping/tax-service-mapping-details/tax-service-mapping-details.component';
import { TaxServiceMappingFilterComponent } from './tax-service-mapping/tax-service-mapping-filter/tax-service-mapping-filter.component';

@NgModule({
  declarations: [TaxTypeListComponent,
    TaxTypeGridActionComponent,
    TaxTypeDeleteComponent,
    TaxComponentsListComponent,
    TaxComponentsGridActionComponent,
    TaxComponentsDeleteComponent,
    TaxServiceMappingGridActionComponent,
    TaxServiceMappingListComponent,
    TaxServiceMappingDeleteComponent,
    TaxServiceMappingDetailsComponent,
    TaxServiceMappingFilterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TaxManagementRoutingModule,    
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    NgxDatatableModule,       
    FlexLayoutModule
  ]
})
export class TaxManagementModule { }
