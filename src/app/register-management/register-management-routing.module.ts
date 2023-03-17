import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DivorceRegisterListComponent } from './divorce-register/divorce-register-list/divorce-register-list.component';
import { FamilyRegisterListComponent } from './family-register/family-register-list/family-register-list.component';
import { HouseRegisterListComponent } from './house-register/house-register-list/house-register-list.component';
import { MarriageRegisterListComponent } from './marriage-register/marriage-register-list/marriage-register-list.component';
import { MemberRegisterListComponent } from './member-register/member-register-list/member-register-list.component';
import { RegisterMasterListComponent } from './register-master/register-master-list/register-master-list.component';

const routes: Routes = [  
  {
    path: 'master/list',
    component: RegisterMasterListComponent
  },
  {
    path: 'member/list',
    component: MemberRegisterListComponent
  },
  {
    path: 'family/list',
    component: FamilyRegisterListComponent
  },
  {
    path: 'house/list',
    component: HouseRegisterListComponent
  },
  {
    path: 'marriage/list',
    component: MarriageRegisterListComponent
  },
  {
    path: 'divorce/list',
    component: DivorceRegisterListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterManagementRoutingModule { }
