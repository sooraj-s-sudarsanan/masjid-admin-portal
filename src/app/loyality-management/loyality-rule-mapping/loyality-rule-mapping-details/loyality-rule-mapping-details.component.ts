import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { ServicePersonDetailsComponent } from 'src/app/service-person/service-person-details/service-person-details.component';

@Component({
  selector: 'app-loyality-rule-mapping-details',
  templateUrl: './loyality-rule-mapping-details.component.html',
  styleUrls: ['./loyality-rule-mapping-details.component.scss']
})
export class LoyalityRuleMappingDetailsComponent implements OnInit {

  columns = [];
  loyaltyList = [];
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ServicePersonDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    private adminBaseService: AdminBaseService,
  ) { }

  ngOnInit(): void {
    this.columns = [
      { name: 'Rule Name', prop: 'loyaltyRule.loyaltyRuleName' },
      { name: 'Rule Code', prop: 'loyaltyRule.loyaltyRuleCode' },
      { name: 'Loyalty Type', prop: 'loyaltyRule.loyaltyType.loyaltyTypeName' },
      { name: 'Scheme Name', prop: 'loyaltyRule.loyaltyScheme.loyaltySchemeName' },
      { name: 'Point Applicable', prop: 'rewardPointApplicable' },
      { name: 'Price', prop: 'servicePrice' }
    ];
    if (this.row && this.row.data) {

      let param = {
        filter: `serviceMappingId==${this.row.data.serviceMappingId}`,
      };
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_LOYALTY_RULE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            this.loyaltyList = response.result.data;            
          }
        }
      }));
      
    }
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
  ngAfterViewChecked(): void {
    window.dispatchEvent(new Event('resize'));
  }
}
