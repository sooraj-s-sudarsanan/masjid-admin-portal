import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';

@Component({
  selector: 'app-tax-service-mapping-details',
  templateUrl: './tax-service-mapping-details.component.html',
  styleUrls: ['./tax-service-mapping-details.component.scss']
})
export class TaxServiceMappingDetailsComponent implements OnInit, OnDestroy {

  columns = [];
  data = [];
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaxServiceMappingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    private adminBaseService: AdminBaseService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      { name: 'Tax', prop: 'taxComponent.taxType.taxTypeName' },
      { name: 'Component', prop: 'taxComponent.taxComponentName' },
      { name: 'Code', prop: 'taxComponent.taxComponentCode' },
      { name: 'Rate', prop: 'taxComponent.taxRate' },
      { name: 'Valuation Type', prop: 'taxComponent.valuationType' }
    ];

    let param = {
      filter: `serviceMappingBean.serviceMappingId==${this.row.data.serviceMappingBean.serviceMappingId}`,
    };
    this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_TAX_SERVICE_MAPPING', param).subscribe((taxResponse) => {

      if (taxResponse.result) {
        if (taxResponse.result.status === 'SUCCESS') {
          this.data = taxResponse.result.data;          
        }
      }
    }
    ));
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
  ngAfterViewChecked():void{
    window.dispatchEvent(new Event('resize'));
}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
