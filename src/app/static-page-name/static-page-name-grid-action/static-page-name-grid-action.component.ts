import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-static-page-name-grid-action',
  templateUrl: './static-page-name-grid-action.component.html',
  styleUrls: ['./static-page-name-grid-action.component.scss']
})
export class StaticPageNameGridActionComponent implements OnInit {

  staticPageNameForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<StaticPageNameGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit(): any {

    this.staticPageNameForm = this.formBuilder.group({
      staticPageName: [this.row.data ? this.row.data.staticPageName : '', [Validators.required, Validators.maxLength(50)]],
      staticPageNameArb: [this.row.data ? this.row.data.staticPageNameArb : '', [Validators.required, Validators.maxLength(50)]],
      staticPageNameId: [this.row.data ? this.row.data.staticPageNameId : null],
      isPageDisplay: [this.row.data ? this.row.data.isPageDisplay=='true' : true]
    });
  }
  get eform(): any { return this.staticPageNameForm.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.staticPageNameForm.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.pageName.key, this.row.data ? false : true, this.staticPageNameForm.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.pageName.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
          console.log(error);
        });
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
