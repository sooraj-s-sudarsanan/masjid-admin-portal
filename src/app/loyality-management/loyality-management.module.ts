import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyalityManagementRoutingModule } from './loyality-management-routing.module';
import { LoyalityTypeListComponent } from './loyality-type/loyality-type-list/loyality-type-list.component';
import { LoyalityTypeGridActionComponent } from './loyality-type/loyality-type-grid-action/loyality-type-grid-action.component';
import { LoyalityTypeDeleteComponent } from './loyality-type/loyality-type-delete/loyality-type-delete.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { LoyalitySchemeDeleteComponent } from './loyality-scheme/loyality-scheme-delete/loyality-scheme-delete.component';
import { LoyalitySchemeGridActionComponent } from './loyality-scheme/loyality-scheme-grid-action/loyality-scheme-grid-action.component';
import { LoyalitySchemeListComponent } from './loyality-scheme/loyality-scheme-list/loyality-scheme-list.component';
import { LoyalityRuleListComponent } from './loyality-rule/loyality-rule-list/loyality-rule-list.component';
import { LoyalityRuleGridActionComponent } from './loyality-rule/loyality-rule-grid-action/loyality-rule-grid-action.component';
import { LoyalityRuleDeleteComponent } from './loyality-rule/loyality-rule-delete/loyality-rule-delete.component';
import { LoyalityRuleMappingListComponent } from './loyality-rule-mapping/loyality-rule-mapping-list/loyality-rule-mapping-list.component';
import { LoyalityRuleMappingGridActionComponent } from './loyality-rule-mapping/loyality-rule-mapping-grid-action/loyality-rule-mapping-grid-action.component';
import { LoyalityRuleMappingDetailsComponent } from './loyality-rule-mapping/loyality-rule-mapping-details/loyality-rule-mapping-details.component';
import { LoyalityRuleMappingFilterComponent } from './loyality-rule-mapping/loyality-rule-mapping-filter/loyality-rule-mapping-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LoyalityRuleMappingEditComponent } from './loyality-rule-mapping/loyality-rule-mapping-edit/loyality-rule-mapping-edit.component';
import { LoyalityRuleMappingDeleteComponent } from './loyality-rule-mapping/loyality-rule-mapping-delete/loyality-rule-mapping-delete.component';
import { LoyalityRuleDetailsComponent } from './loyality-rule/loyality-rule-details/loyality-rule-details.component';

@NgModule({
  declarations: [LoyalityTypeListComponent,
    LoyalityTypeGridActionComponent,
    LoyalityTypeDeleteComponent,

    LoyalitySchemeListComponent,
    LoyalitySchemeGridActionComponent,
    LoyalitySchemeDeleteComponent,
    LoyalityRuleListComponent,
    LoyalityRuleGridActionComponent,
    LoyalityRuleDeleteComponent,
    LoyalityRuleMappingListComponent,
    LoyalityRuleMappingGridActionComponent,
    LoyalityRuleMappingDetailsComponent,
    LoyalityRuleMappingFilterComponent,
    LoyalityRuleMappingEditComponent,
    LoyalityRuleMappingDeleteComponent,
    LoyalityRuleDetailsComponent],
  imports: [
    CommonModule,
    LoyalityManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule
  ],
  entryComponents: [
    LoyalityTypeGridActionComponent, 
    LoyalityTypeDeleteComponent,
    
    LoyalitySchemeGridActionComponent,
    LoyalitySchemeDeleteComponent
  ]
})
export class LoyalityManagementModule { }
