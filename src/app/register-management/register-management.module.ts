import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterManagementRoutingModule } from './register-management-routing.module';
import { RegisterMasterGridActionComponent } from './register-master/register-master-grid-action/register-master-grid-action.component';
import { RegisterMasterListComponent } from './register-master/register-master-list/register-master-list.component';
import { RegisterMasterDeleteComponent } from './register-master/register-master-delete/register-master-delete.component';
import { RegisterMasterDetailsComponent } from './register-master/register-master-details/register-master-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { CoreModule } from '../core/core.module';
import { MemberRegisterDeleteComponent } from './member-register/member-register-delete/member-register-delete.component';
import { MemberRegisterDetailsComponent } from './member-register/member-register-details/member-register-details.component';
import { MemberRegisterListComponent } from './member-register/member-register-list/member-register-list.component';
import { MemberRegisterGridActionComponent } from './member-register/member-register-grid-action/member-register-grid-action.component';
import { FamilyRegisterDeleteComponent } from './family-register/family-register-delete/family-register-delete.component';
import { FamilyRegisterDetailsComponent } from './family-register/family-register-details/family-register-details.component';
import { FamilyRegisterListComponent } from './family-register/family-register-list/family-register-list.component';
import { FamilyRegisterGridActionComponent } from './family-register/family-register-grid-action/family-register-grid-action.component';
import { HouseRegisterDeleteComponent } from './house-register/house-register-delete/house-register-delete.component';
import { HouseRegisterDetailsComponent } from './house-register/house-register-details/house-register-details.component';
import { HouseRegisterListComponent } from './house-register/house-register-list/house-register-list.component';
import { HouseRegisterGridActionComponent } from './house-register/house-register-grid-action/house-register-grid-action.component';
import { MarriageRegisterDeleteComponent } from './marriage-register/marriage-register-delete/marriage-register-delete.component';
import { MarriageRegisterDetailsComponent } from './marriage-register/marriage-register-details/marriage-register-details.component';
import { MarriageRegisterListComponent } from './marriage-register/marriage-register-list/marriage-register-list.component';
import { MarriageRegisterGridActionComponent } from './marriage-register/marriage-register-grid-action/marriage-register-grid-action.component';
import { DivorceRegisterDeleteComponent } from './divorce-register/divorce-register-delete/divorce-register-delete.component';
import { DivorceRegisterDetailsComponent } from './divorce-register/divorce-register-details/divorce-register-details.component';
import { DivorceRegisterListComponent } from './divorce-register/divorce-register-list/divorce-register-list.component';
import { DivorceRegisterGridActionComponent } from './divorce-register/divorce-register-grid-action/divorce-register-grid-action.component';


@NgModule({
  declarations: [RegisterMasterGridActionComponent,
    RegisterMasterListComponent,
    RegisterMasterDeleteComponent,
    RegisterMasterDetailsComponent,
    
    MemberRegisterDeleteComponent, 
    MemberRegisterDetailsComponent, 
    MemberRegisterListComponent, 
    MemberRegisterGridActionComponent,
  
    FamilyRegisterListComponent,
    FamilyRegisterDeleteComponent, 
    FamilyRegisterDetailsComponent, 
    FamilyRegisterGridActionComponent,

    HouseRegisterListComponent,
    HouseRegisterDeleteComponent, 
    HouseRegisterDetailsComponent, 
    HouseRegisterGridActionComponent,

    
    MarriageRegisterListComponent,
    MarriageRegisterDeleteComponent, 
    MarriageRegisterDetailsComponent, 
    MarriageRegisterGridActionComponent,

    DivorceRegisterListComponent,
    DivorceRegisterDeleteComponent, 
    DivorceRegisterDetailsComponent, 
    DivorceRegisterGridActionComponent,
  ],
  imports: [
    CommonModule,
    RegisterManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],

})
export class RegisterManagementModule { }
