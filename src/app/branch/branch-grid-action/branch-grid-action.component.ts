import { Component, ElementRef, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { WorkingDaysModel } from 'src/app/core/model/working-days-model';
import * as moment from 'moment';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CropperDialogComponent } from 'src/app/core/cropper-dialog/cropper-dialog.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-branch-grid-action',
  templateUrl: './branch-grid-action.component.html',
  styleUrls: ['./branch-grid-action.component.scss']
})
export class BranchGridActionComponent implements OnInit, OnDestroy {

  form: FormGroup;
  merchantList: any;
  wStartDay = null;
  wEndDay = null;
  workingDays = WorkingDaysModel.days;

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];
  userInfo: any;
  nationalityList = [];
  locationList = [];
  branchWeeklyOff = [];
  breakTime = [];
  OperationTime = [];
  holidayArray = [];
  @ViewChild('dp3') picker;
  croppedImage: string;
  @ViewChild('cropperPhoto', { static: true }) cropperPhotoRef: TemplateRef<any>;
  @ViewChild('logoFile', { static: false }) logoFileRef: ElementRef;
  dialogRefCropImage: any;
  imageChangedEvent: any = '';
  logo = null;
  uploadedFileName: any;
  tabIndex = 0;
  minDate = new Date();
  public Editor = ClassicEditor;
  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public initializeService: InitializeService,
    public authService: AuthenticationService,
    public dropDownService: DropDownService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BranchGridActionComponent>,
    private imageCompress: NgxImageCompressService
  ) {
    this.logo = this.row.data ? this.row.data.branchLogoUrl : null;
  }

  ngOnInit(): void {
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {

        if (this.authService.userInfo) {
          this.userInfo = this.authService.userInfo;
          this.isLoaded$.next(true);
        }
      }
    }));

    this.subscriptions.push(this.isLoaded$.subscribe(loaded => {
      if (loaded) {
        this.headerService.toggleSpinner(false);
        this.form = this.formBuilder.group({
          branchName: [this.row.data ? this.row.data.branchName : '', [Validators.required, Validators.maxLength(200)]],
          branchNameAR: [this.row.data ? this.row.data.branchNameAR : '', [Validators.required, Validators.maxLength(200)]],
          branchDescription: [this.row.data ? this.row.data.branchDescription : '', [Validators.maxLength(4000)]],
          branchDescriptionAR: [this.row.data ? this.row.data.branchDescriptionAR : '', [Validators.maxLength(4000)]],
          branchLocationName: [this.row.data ? this.row.data.branchLocationName : '', [Validators.maxLength(400)]],
          branchLogoContent: [this.row.data ? this.row.data.branchLogoContent : ''],
          branchLogoFileName: [this.row.data ? this.row.data.branchLogoFileName : ''],
          branchLogoUrl: [this.row.data ? this.row.data.branchLogoUrl : ''],
          merchantBean: this.formBuilder.group({
            merchantId: [this.row.data ? this.row.data.merchantBean ?
              this.row.data.merchantBean.merchantId : '' : '', [Validators.required]]
          }),
          branchId: [this.row.data ? this.row.data.branchId : ''],
          branchContactMobile: [this.row.data ? this.row.data.branchContactMobile : '', [Validators.maxLength(15), Validators.pattern('^(\\+\\d{1,3}[- ]?)?\\d{8,14}$')]],
          branchContactLandPhone1: [this.row.data ? this.row.data.branchContactLandPhone1 : '', [Validators.maxLength(15), Validators.pattern('^(\\+\\d{1,3}[- ]?)?\\d{8,14}$')]],
          whatIsIncluded: [this.row.data ? this.row.data.whatIsIncluded : '', [Validators.maxLength(4000)]],
          whatToExpect: [this.row.data ? this.row.data.whatToExpect : '', [Validators.maxLength(4000)]],
          cancellationPolicy: [this.row.data ? this.row.data.cancellationPolicy : '', [Validators.maxLength(4000)]],
          branchHolidays: [''],
          branchWeeklyOff: [this.row.data ? this.row.data.branchHolidays : ''],
          branchbreakTime: [this.row.data ? this.row.data.branchbreakTime : ''],
          branchOperationTime: [this.row.data ? this.row.data.branchOperationTime : ''],
          locality: this.formBuilder.group({
            localityId: [this.row.data ? this.row.data.locality ?
              this.row.data.locality.localityId : '' : '', [Validators.required]]
          }),
          nationality: this.formBuilder.group({
            nationalityId: [this.row.data ? this.row.data.locality ?
              this.row.data.locality.nationalityBean.nationalityId : '' : '', [Validators.required]]
          }),
          branchAddress1: [this.row.data ? this.row.data.branchAddress1 : '', [Validators.maxLength(200)]],
          branchAddress2: [this.row.data ? this.row.data.branchAddress2 : '', [Validators.maxLength(200)]],
          branchAddress1AR: [this.row.data ? this.row.data.branchAddress1AR : '', [Validators.maxLength(200)]],
          branchAddress2AR: [this.row.data ? this.row.data.branchAddress2AR : '', [Validators.maxLength(200)]],
          branchLatitude: [this.row.data ? this.row.data.branchLatitude : '', [Validators.required, Validators.pattern('^[\\-\\+]?([0-8]?\\d{1}|[0-8]?\\d{1}\\.\\d{1,15}|90|90\\.0{1,15})$')]],
          branchLongitude: [this.row.data ? this.row.data.branchLongitude : '', [Validators.required, Validators.pattern('^[\\-\\+]?([0-8]?\\d{1}|[0-8]?\\d{1}\\.\\d{1,15}|90|90\\.0{1,15})$')]],
          embedMap: [this.row.data ? this.row.data.embedMap : null],
          branchLink: [this.row.data ? this.row.data.branchLink : null],
          bookingAccepting:[this.row.data ? this.row?.data?.bookingAccepting!=='false'?true:false:true],
        });
        if (this.row.data && this.row.data.branchWeeklyOff) {
          if (this.row.data.branchWeeklyOff.indexOf('-') !== -1) {
            this.branchWeeklyOff = this.row.data.branchWeeklyOff.split('-');
          } else {
            this.branchWeeklyOff.push(this.row.data.branchWeeklyOff)
          }
        }
        if (this.row.data && this.row.data.branchHolidays) {
          this.holidayArray = this.row.data.branchHolidays.split(',');
        }
        if (this.row.data && this.row.data.locality) {
          this.onSelectCountry(this.row.data.locality.nationalityBean);
        }


        // Get all Categories
        this.headerService.toggleSpinner(true);
        this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS').subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.merchantList = response.result.data;
              }
            }
            this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_NATIONALITY', null).subscribe((locResponse) => {
              if (locResponse) {
                if (locResponse.result) {
                  if (locResponse.result.status === 'SUCCESS') {
                    this.nationalityList = locResponse.result.data;
                  }
                }
                this.headerService.toggleSpinner(false);
              }
            },
              (error: any) => {
                this.headerService.toggleSpinner(false);

              }));
            this.headerService.toggleSpinner(false);
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);

          }));

        // Load BreakTiime
        this.workingDays.forEach(item => {
          this.breakTime.push({
            day: item,
            start: null,
            end: null
          });
          this.OperationTime.push({
            day: item,
            start: null,
            end: null
          });
        });
        if (this.row.data.branchbreakTime) {
          const parsedData = JSON.parse(this.row.data.branchbreakTime);
          if (parsedData.length > 0) {
            parsedData.forEach(element => {
              if (element.day) {
                let index = this.workingDays.findIndex(x => x.value == element.day.value);
                if (index > -1) {
                  this.breakTime[index].start = element.start;
                  this.breakTime[index].end = element.end
                }
              }
            });
          }
        }
        if (this.row.data.branchOperationTime) {
          const parsedData = JSON.parse(this.row.data.branchOperationTime);
          if (parsedData.length > 0) {
            parsedData.forEach(element => {
              if (element.day) {
                let index = this.workingDays.findIndex(x => x.value == element.day.value);
                if (index > -1) {
                  this.OperationTime[index].start = element.start;
                  this.OperationTime[index].end = element.end
                }
              }
            });
          }
        }
      }
    }));
  }

  get eform(): any { return this.form.controls; }

  findInvalidControl(f: FormGroup) {
    let invalid = null;
    const controls = f.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid = name;
        return invalid;
      }
    }
    return invalid;
  }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      const invalidControl = this.findInvalidControl(this.form);
      if (invalidControl) {
        let find = ['branchName',
          'branchNameAR',
          'merchantBean',
          'branchContactMobile',
          'branchContactLandPhone1',
          'locality',
          'nationality',
          'branchLatitude',
          'branchLongitude',
          'branchLocationName'].find(x => x == invalidControl);
        if (find) {
          this.tabIndex = 0;
        }
      }

      this.alertService.open
        (ResponseStatusModel.ERROR, `Required or invalid value are found on ${this.tabIndex == 0 ? 'First' :
          this.tabIndex == 1 ? 'Second' : 'Third'} Tab`);

      // Object.keys(this.form.controls).forEach(key => {
      //   const controlErrors: ValidationErrors = this.form.get(key).errors;               
      //   if (controlErrors != null) {
      //     Object.keys(controlErrors).forEach(keyError => {
      //       console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      //     });
      //   }
      // });
      // console.log(this.form['controls'].child['controls'])
      // Object.keys(this.form['controls'].child['controls']).forEach(key => {
      //   console.log(key)
      // });
      return false;
    }
    let branchWeeklyOffDay = '';
    if (this.branchWeeklyOff.length) {
      branchWeeklyOffDay = this.branchWeeklyOff.join('-');
    }
    this.form.get('branchWeeklyOff').setValue(branchWeeklyOffDay);
    if (this.breakTime) {
      const breakHour = [];
      this.breakTime.forEach(item => {
        if (item.start && item.end) {
          breakHour.push(item);
        }
      });
      this.form.get('branchbreakTime').setValue(JSON.stringify(breakHour));
    }
    if (this.OperationTime) {
      const opHours = [];
      this.OperationTime.forEach(item => {
        if (item.start && item.end) {
          opHours.push(item);
        }
      });
      this.form.get('branchOperationTime').setValue(JSON.stringify(opHours));
    }
    // const branchHoliday = this.form.get('branchHolidays').value;
    // if (branchHoliday) {
    //   this.form.get('branchHolidays').setValue(
    //     (moment(branchHoliday)).format('DD-MM-YYYY')
    //   );
    // }
    if (this.holidayArray) {
      this.form.get('branchHolidays').setValue(this.holidayArray.map(s => s).join(','));
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.branch.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.branch.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
        });
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  handleFileSelect(evt): any {

    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      this.form.get('branchLogoFileName').setValue(file.name);
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }


  _handleReaderLoaded(readerEvt): any {
    btoa(readerEvt.target.result);
    this.form.get('branchLogoContent').setValue(btoa(readerEvt.target.result));
  }

  onSelectedWDay(event, sec: number): any {
    if (sec === 1) {
      this.wStartDay = event;
    } else if (sec === 2) {
      this.wEndDay = event;
    }
    if (this.wStartDay && this.wEndDay) {
      this.form.get('branchWeeklyOff').setValue(this.wStartDay + '-' + this.wEndDay);
    } else if (this.wStartDay) {
      this.form.get('branchWeeklyOff').setValue(this.wStartDay);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateWeeklyOff(event, value) {
    if (value) {
      const index = this.branchWeeklyOff.length ? this.branchWeeklyOff.findIndex(x => x == value) : -1;

      if (event.checked && index == -1) {
        this.branchWeeklyOff.push(value);
      } else if (index > -1) {
        this.branchWeeklyOff.splice(index, 1);
      }
    }

  }
  isSelected(value) {
    const find = this.branchWeeklyOff.find(x => x == value);
    if (find) {
      return true;
    }
    return false;
  }

  clearBranchHolidays() {
    this.form.get('branchHolidays').setValue(null);
  }

  setTime(data, item, type) {

    if (type == 's') {
      item.start = data;
    } else if (type == 'e') {
      item.end = data;
    }
  }
  clear(item) {
    item.start = null;
    item.end = null;
  }

  holidaySelected(item) {
    this.holidayArray.push((moment(item)).format('DD-MM-YYYY'));
    //this.form.get('branchHolidays').setValue(null);
    setTimeout(() => {
      this.clearBranchHolidays();
      this.picker.close();
    }, 100);
  }

  clearHoliday(index) {
    if (index > -1) {
      this.holidayArray.splice(index, 1);
    }
  }

  searchIcon(term: string, item: any) {
    term = term.toLowerCase();
    return item.localityName.toLowerCase().indexOf(term) > -1;
  }
  searchForCountry(term: string, item: any) {
    term = term.toLowerCase();
    return item.nationalityName.toLowerCase().indexOf(term) > -1;
  }


  copyToAll(item, type) {

    if (item) {
      if (item.start && item.end) {
        if (type == 'bt') {
          this.breakTime.forEach((element, i) => {
            if (i > 0) {
              element.start = item.start;
              element.end = item.end
            }
          });
        } else if (type == 'ot') {
          this.OperationTime.forEach((element, i) => {
            if (i > 0) {
              element.start = item.start;
              element.end = item.end
            }
          });
        }
      }
    }
  }

  onSelectCountry(country) {
    setTimeout(() => {
      this.headerService.toggleSpinner(true);
    }, 100);
    if (country) {
      const param = {
        filter: `nationalityBean.nationalityId==${country.nationalityId}`,
      };
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_LOCALITIES', param).subscribe((locResponse) => {
        if (locResponse) {
          if (locResponse.result) {
            if (locResponse.result.status === 'SUCCESS') {
              this.locationList = locResponse.result.data;
            }
          }
          setTimeout(() => {
            this.headerService.toggleSpinner(false);
          }, 100);
        }
      },
        (error: any) => {
          setTimeout(() => {
            this.headerService.toggleSpinner(false);
          }, 100);
        }));
    }
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const files = event.target.files;
    const file = files[0];
    if (files && file) {
      this.uploadedFileName =`${new Date().getTime()}${file.name}`;
      this.cropImage();
    }
  }

  cropImage() {
    this.dialogRefCropImage = this.dialog.open(CropperDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        title: 'Branch Logo',
        imageChangedEvent: this.imageChangedEvent,
        aspectRatio: [3, 2]
      }
    });

    this.subscriptions.push(this.dialogRefCropImage.afterClosed().subscribe(result => {
      if (result) {
        if (result.status == 'yes') {
          if (result.croppedImage) {
            this.logo = result.croppedImage;
            // console.log('in',this.logo)
            this.form.get('branchLogoFileName').setValue(this.uploadedFileName);
            // console.warn('Size in bytes is before:', this.imageCompress.byteCount(result.croppedImage));
            this.imageCompress.compressFile(result.croppedImage, 0, 50, 50).then(
              result => {
                this.form.get('branchLogoContent').setValue(result.split(',')[1]);
                // console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
              }
            );
          }
        }
      }
    }));
  }

}
