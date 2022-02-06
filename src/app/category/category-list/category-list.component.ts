import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { CategoryGridActionComponent } from '../category-grid-action/category-grid-action.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  filterComponent: any = CategoryFilterComponent;
  columns = [
    { prop: 'categoryName', name: 'Category Name' },
    { prop: 'categoryNameAR', name: 'Category Arabic Name' },
    { prop: 'categoryDescription', name: 'Category Description' },
    { prop: 'categoryDisplayName', name: 'Category DisplayName' }

  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.category.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: CategoryGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.subModule.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent,
    //   hasPermission: this.permissionService.hasPermission('Info')
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.category.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: CategoryGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.category.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: CategoryDeleteComponent,
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
