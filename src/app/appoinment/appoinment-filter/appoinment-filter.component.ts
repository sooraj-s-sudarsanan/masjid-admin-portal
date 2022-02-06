import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-appoinment-filter',
  templateUrl: './appoinment-filter.component.html',
  styleUrls: ['./appoinment-filter.component.scss']
})
export class AppoinmentFilterComponent implements OnInit, OnDestroy {


  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  serviceList = [];
  selectedService: any;
  selectedStatus = BookingStatusTextModel.BKG_CNF;

  subscriptions: Subscription[] = [];
  searchBy = [
    {
      Display: 'Booking Number',
      value: 'BN'
    },
    {
      Display: 'Customer Mobile Number',
      value: 'CM'
    },
    {
      Display: 'Customer Email',
      value: 'CE'
    }, {
      Display: 'Customer Name',
      value: 'CN'
    }];
  selectedSearchBy: any = null;
  selectedSearchValue: any = null;

  constructor(
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private manageGridService: ManageGridService,
    public dropDownService: DropDownService,
    public authService: AuthenticationService,
    public commonService : CommonService
  ) { }

  ngOnInit(): void {
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.merchantList = response.result.data;
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);

      }));
  }

  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    this.serviceList = [];
    this.selectedBranch = null;
    this.selectedService = null;
    if (merchantId) {
      this.manageGridService.loadFilters$.next(`serviceMappingBean.branch.merchantBean.merchantId==${merchantId}##bookingStatus==${this.selectedStatus}`);
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.dropDownService.getBranch('ADM_LIST_MERCHANT_BRANCHES', param.filter).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  branchSelectionChange(branch: any): any {
    if (branch) {
      this.selectedService = null;
      this.manageGridService.loadFilters$.next(`serviceMappingBean.branch.branchId==${branch}##bookingStatus==${this.selectedStatus}`);
      const param = {
        filter: `branch.branchId==${branch}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.serviceList = response.result.data;
            }
          }
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  serviceSelectionChange(mappingId: any): any {

    if (mappingId) {
      this.manageGridService.loadFilters$.next(`serviceMappingBean.serviceMappingId==${mappingId}##bookingStatus==${this.selectedStatus}`);
    }
  }

  get getBookingStatusText() {
    return BookingStatusTextModel;
  }

  statusChange(status) {
    if (status) {
      this.manageGridService.loadFilters$.next(`CLEAR`);
      let filter = null;
      if (this.authService.userInfo) {
        const userInfo = this.authService.userInfo;
        if (userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin) {
          filter = `serviceMappingBean.branch.merchantBean.merchantId==${userInfo.merchant.merchantId}`;
        } else if (userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
          filter = `serviceMappingBean.branch.merchantBean.merchantId==${userInfo.merchant.merchantId}`;
        }
        if (status == this.getBookingStatusText.all) {
          this.manageGridService.loadFilters$.next(`${filter}##bookingStatus==${this.getBookingStatusText.BKG_CAN}##bookingStatus==${this.getBookingStatusText.BKG_CNF}##bookingStatus==${this.getBookingStatusText.BKG_PROG}##bookingStatus==${this.getBookingStatusText.BKG_CMPLT}`);
        } else {
          this.manageGridService.loadFilters$.next(`${filter}##bookingStatus==${status}`);
        }
      }
    }
  }

  onSearch($event) {
    if (this.selectedSearchBy && this.selectedSearchValue) {
      if (this.selectedSearchBy == 'CM') {
        this.manageGridService.loadFilters$.next(`users.mobileNo==${this.commonService.encrypt(this.selectedSearchValue)}##bookingStatus==${this.selectedStatus}`);
      } else if (this.selectedSearchBy == 'CE') {
        this.manageGridService.loadFilters$.next(`users.email==${this.commonService.encrypt(this.selectedSearchValue)}##bookingStatus==${this.selectedStatus}`);
      } else if (this.selectedSearchBy == 'CN') {
        this.manageGridService.loadFilters$.next(`users.fullName==${this.selectedSearchValue}##bookingStatus==${this.selectedStatus}`);
      } else if (this.selectedSearchBy == 'BN') {
        this.manageGridService.loadFilters$.next(`bookingNumber==${this.selectedSearchValue}##bookingStatus==${this.selectedStatus}`);
      }
    }

  }

  onClear($event) {
    this.selectedSearchValue = null;
    this.selectedMerchant = null;
    this.selectedBranch = null;
    this.selectedService = null;
    this.manageGridService.loadFilters$.next(`bookingStatus==${this.selectedStatus}`);
  }

  searchByChange() {
    this.selectedSearchValue = null;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
