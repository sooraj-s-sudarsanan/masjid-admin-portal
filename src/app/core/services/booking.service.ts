import { Injectable } from '@angular/core';
import { from } from 'core-js/fn/array';
import { BehaviorSubject } from 'rxjs';
import { AdminBaseService } from '../services/admin-base.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public statusMaster = null;
  public statusMaster$ = new BehaviorSubject<any>(this.statusMaster);

  public bookedInfo = null;

  constructor(
    public adminBaseService: AdminBaseService
  ) { }

  public readStausMaster(): any {
    if (this.statusMaster) {
      this.statusMaster$.next(this.statusMaster);
    } else {
      const requestBody = {
        filter: '',
        sortBy: '',
        sortOrder: 'ASC'
      };
      this.adminBaseService.requestSubmit('ADM_LIST_BOOKING_STATUSMASTER', requestBody).subscribe((response) => {
        if (response) {
          if (response.result) {
            this.statusMaster = response.result.data;
            this.statusMaster$.next(this.statusMaster);
          }
        }
      });
    }
  }
}
