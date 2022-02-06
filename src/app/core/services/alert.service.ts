import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseStatusModel } from '../model/response-status-model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  open(type, message) {
    if (type === ResponseStatusModel.SUCCESS) {
      this.snackBar.open(message, 'OK', {
        duration: 4000,
        panelClass: ['snackbar-success'],
        verticalPosition: 'top'
      });
    } else if (type === ResponseStatusModel.ERROR) {
      this.snackBar.open(message, 'OK', {
        duration: 5000,
        panelClass: ['snackbar-error'],
        verticalPosition: 'top'
      });
    } else if (type === ResponseStatusModel.WARNING) {
      this.snackBar.open(message, 'OK', {
        duration: 5000,
        panelClass: ['snackbar-warning'],
        verticalPosition: 'top'
      });
    }

  }
}
