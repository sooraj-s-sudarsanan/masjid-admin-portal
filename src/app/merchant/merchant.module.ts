import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantGridActionComponent } from './merchant-grid-action/merchant-grid-action.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantDeleteComponent } from './merchant-delete/merchant-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { MerchantFilterComponent } from './merchant-filter/merchant-filter.component';
import { TermAndConditionModalComponent } from './term-and-condition-modal/term-and-condition-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MerchantGridActionComponent, MerchantListComponent, MerchantDeleteComponent, MerchantDetailsComponent, MerchantFilterComponent, TermAndConditionModalComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [MerchantGridActionComponent, MerchantDeleteComponent, MerchantDetailsComponent, TermAndConditionModalComponent]
})
export class MerchantModule { }
