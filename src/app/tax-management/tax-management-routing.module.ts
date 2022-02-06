import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxComponentsListComponent } from './tax-components/tax-components-list/tax-components-list.component';
import { TaxServiceMappingListComponent } from './tax-service-mapping/tax-service-mapping-list/tax-service-mapping-list.component';
import { TaxTypeListComponent } from './tax-type/tax-type-list/tax-type-list.component';

const routes: Routes = [
  {
    path: 'type',
    component: TaxTypeListComponent
  },
  {
    path: 'component',
    component: TaxComponentsListComponent
  },
  {
    path: 'mapping',
    component: TaxServiceMappingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxManagementRoutingModule { }
