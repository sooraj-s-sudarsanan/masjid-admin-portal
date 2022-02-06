import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyalityTypeListComponent } from './loyality-type/loyality-type-list/loyality-type-list.component';
import { LoyalitySchemeListComponent } from './loyality-scheme/loyality-scheme-list/loyality-scheme-list.component'
import { LoyalityRuleListComponent } from './loyality-rule/loyality-rule-list/loyality-rule-list.component';
import { LoyalityRuleMappingListComponent } from './loyality-rule-mapping/loyality-rule-mapping-list/loyality-rule-mapping-list.component';

const routes: Routes = [
  {
    path: 'type-list',
    component: LoyalityTypeListComponent
  },
  {
    path: 'scheme-list',
    component: LoyalitySchemeListComponent
  },
  {
    path: 'rule-list',
    component: LoyalityRuleListComponent
  },
  {
    path: 'rule-mapping-list',
    component: LoyalityRuleMappingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyalityManagementRoutingModule { }
