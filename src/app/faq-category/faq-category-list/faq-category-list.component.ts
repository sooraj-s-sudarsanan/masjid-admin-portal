import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { FaqCategoryDeleteComponent } from '../faq-category-delete/faq-category-delete.component';
import { FaqCategoryGridActionComponent } from '../faq-category-grid-action/faq-category-grid-action.component';

@Component({
  selector: 'app-faq-category-list',
  templateUrl: './faq-category-list.component.html',
  styleUrls: ['./faq-category-list.component.scss']
})
export class FaqCategoryListComponent implements OnInit {

  columns = [
    { prop: 'faqTypeName', name: 'FAQ Type' },
    { prop: 'faqTypeNameAR', name: 'FAQ Type Arb' },
    { prop: 'faqTypeDesc', name: 'FAQ Type Desc.' },
    { prop: 'faqTypeDescAR', name: 'FAQ Type Desc. Arb' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.faqCategoryModule.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: FaqCategoryGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.faqCategoryModule.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.faqCategoryModule.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: FaqCategoryGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.faqCategoryModule.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: FaqCategoryDeleteComponent,
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
