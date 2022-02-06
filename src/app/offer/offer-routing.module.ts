import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferMappingListComponent } from './offer-mapping-list/offer-mapping-list.component';
import { OfferTypeListComponent } from './offer-type-list/offer-type-list.component';

const routes: Routes = [
  {
    path: 'type/list',
    component: OfferTypeListComponent
  },
  {
    path: 'list',
    component: OfferListComponent
  },
  {
    path: 'mapping/list',
    component: OfferMappingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
