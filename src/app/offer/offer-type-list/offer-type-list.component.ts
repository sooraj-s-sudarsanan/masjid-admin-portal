import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { OfferTypeDeleteComponent } from '../offer-type-delete/offer-type-delete.component';
import { OfferTypeGridActionComponent } from '../offer-type-grid-action/offer-type-grid-action.component';

@Component({
  selector: 'app-offer-type-list',
  templateUrl: './offer-type-list.component.html',
  styleUrls: ['./offer-type-list.component.scss']
})
export class OfferTypeListComponent implements OnInit {

  columns = [
    { prop: 'offerTypeName', name: 'Name' },
    { prop: 'offerTypeNameAR', name: 'Name AR' },
    { prop: 'offerTypeDesc', name: 'Description' },
    { prop: 'offerTypeDescAR', name: 'Description AR' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.offerType.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: OfferTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.offerType.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: OfferTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.offerType.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: OfferTypeDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];
  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

}
