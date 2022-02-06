import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { of as observableOf } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-role-update-permission',
  templateUrl: './role-update-permission.component.html',
  styleUrls: ['./role-update-permission.component.scss']
})
export class RoleUpdatePermissionComponent implements OnInit {

  menuItems: any[] = [];
  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      node
    };
  }
  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<any>(
    node => node.level, node => node.expandable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(
    public dialogRef: MatDialogRef<RoleUpdatePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public adminBaseService: AdminBaseService,
    public headerService: HeaderService,
    public alertService: AlertService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl<any>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  /** Get the level of the node */
  getLevel(node: any): any {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: any): any {
    return node.expandable;
  };

  /** Get the children for the node. */
  getChildren(node: any): any {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: any): any {
    return node.expandable;
  }


  ngOnInit(): void {

    setTimeout(() => {
      this.headerService.toggleSpinner(true);
    }, 100);
    this.adminBaseService.requestSubmit('ADM_LIST_MODULE', null).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            response.result.data.forEach(element => {
              if (element.subModuleList.length > 0) {

                const node = {
                  name: element.moduleName,
                  type: 'folder',
                  moduleId: element.moduleId,
                  children: []
                };
                element.subModuleList.forEach(subelement => {
                  node.children.push({
                    name: subelement.submoduleName,
                    type: 'folder',
                    submoduleId: subelement.submoduleId,
                    hasViewPermission: false,
                    hasCreatePermission: false,
                    hasUpdatePermission: false,
                    hasDeletePermission: false
                  });
                });
                this.menuItems.push(node);
              }
            });

            if (this.menuItems.length > 0) {
              const params = {
                roleId: this.row.data.roleId
              };
              this.adminBaseService.requestSubmit('ADM_GET_PERMISSION_BYROLEID', params).subscribe((viewResponse) => {

                if (viewResponse) {
                  if (viewResponse.result) {
                    if (viewResponse.result.status === ResponseStatusModel.SUCCESS) {

                      if (viewResponse.result.data) {
                        if (viewResponse.result.data) {
                          viewResponse.result.data.forEach(element => {
                            element.subModules.forEach(perm => {
                              const find = this.menuItems
                                .filter((el) =>
                                  el.children.some((subel) => subel.submoduleId == perm.submoduleId))
                                .map(el => {
                                  return el.children.find(subElement => subElement.submoduleId == perm.submoduleId);
                                });
                              // const find = this.menuItems.find(x => x.submoduleId === element.submodules.submoduleId);
                              if (find.length > 0) {
                                find[0].hasViewPermission = perm.permissionAssigned.hasViewPermission;
                                find[0].hasCreatePermission = perm.permissionAssigned.hasCreatePermission;
                                find[0].hasUpdatePermission = perm.permissionAssigned.hasUpdatePermission;
                                find[0].hasDeletePermission = perm.permissionAssigned.hasDeletePermission;
                              }

                            });
                          });
                        }
                      }
                      this.dataSource.data = this.menuItems;
                    }
                  }
                }
                setTimeout(() => {

                  this.headerService.toggleSpinner(false);
                }, 100);
              });
            } else {
              setTimeout(() => {

                this.headerService.toggleSpinner(false);
              }, 100);
            }
          }
        }
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
      });
  }
  menuItemChecked(event, type, menu): any {

    if (type && menu.node && menu.node.submoduleId) {
      const find = this.menuItems
        .filter((el) =>
          el.children.some((subel) => subel.submoduleId == menu.node.submoduleId))
        .map(el => {
          return el.children.find(subElement => subElement.submoduleId == menu.node.submoduleId);
        });
      if (find.length > 0) {
        if (type === 'C') {
          find[0].hasCreatePermission = event.checked;
        } else if (type === 'R') {
          find[0].hasViewPermission = event.checked;
        } else if (type === 'U') {
          find[0].hasUpdatePermission = event.checked;
        } else if (type === 'D') {
          find[0].hasDeletePermission = event.checked;
        }
      }
    }
  }

  updatePermission(): any {

    const listToProcess = [];
    if (this.menuItems.length > 0) {
      this.headerService.toggleSpinner(true);
      this.menuItems.forEach((element, index) => {

        element.children.forEach((childEl) => {

          if (childEl.hasViewPermission ||
            childEl.hasCreatePermission ||
            childEl.hasUpdatePermission ||
            childEl.hasDeletePermission) {
            listToProcess.push(
              {
                hasViewPermission: childEl.hasViewPermission,
                hasCreatePermission: childEl.hasCreatePermission,
                hasUpdatePermission: childEl.hasUpdatePermission,
                hasDeletePermission: childEl.hasDeletePermission,
                landingPage: false,
                roleId: this.row.data.roleId,
                submodules: {
                  submoduleId: childEl.submoduleId
                },
                modules: {
                  moduleId: element.moduleId
                }
              }
            );
          }
        });

      });

      const params = {
        listToProcess
      };
      if (listToProcess.length > 0) {
        this.adminBaseService.requestSubmit('ADM_ADD_MULTIPLE_PERMISSIONS', params).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.dialogRef.close({ action: 'UpdatePermission' });
                this.alertService.open(ResponseStatusModel.SUCCESS, 'Role permission updated successfully.');
              }
            }
          }
          this.headerService.toggleSpinner(false);
        });
      } else {
        this.headerService.toggleSpinner(false);
      }
    }

  }

  selectAll(event, i): any {

    if (i.node && i.node.submoduleId) {
      const find = this.menuItems
        .filter((el) =>
          el.children.some((subel) => subel.submoduleId == i.node.submoduleId))
        .map(el => {
          return el.children.find(subElement => subElement.submoduleId == i.node.submoduleId);
        });
      if (find.length > 0) {
        find[0].hasViewPermission = event.checked;
        find[0].hasCreatePermission = event.checked;
        find[0].hasUpdatePermission = event.checked;
        find[0].hasDeletePermission = event.checked;
      }
    }
  }
}
