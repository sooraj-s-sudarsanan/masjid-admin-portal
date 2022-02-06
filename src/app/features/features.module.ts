import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesGridActionComponent } from './features-grid-action/features-grid-action.component';
import { FeaturesListComponent } from './features-list/features-list.component';
import { FeaturesDetailsComponent } from './features-details/features-details.component';
import { FeaturesDeleteComponent } from './features-delete/features-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';


@NgModule({
  declarations: [FeaturesGridActionComponent, FeaturesListComponent, FeaturesDetailsComponent, FeaturesDeleteComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    FeaturesGridActionComponent,
    FeaturesDetailsComponent,
    FeaturesDeleteComponent
  ]
})
export class FeaturesModule { }
