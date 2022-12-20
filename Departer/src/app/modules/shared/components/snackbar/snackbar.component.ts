import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarTheme } from '../../models/snackbat.theme.enum';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent  {

  constructor(public snackBar: MatSnackBar) { }


  public openSnackBar(message: string, theme: SnackBarTheme, duration?: number): void {
    let theme_new: string;
    if (theme === SnackBarTheme.error) {
      theme_new = 'error_new';
    } else if (theme === SnackBarTheme.success) {
      theme_new = 'success_new';
    } else {
      theme_new = 'default_new';
    }

    this.snackBar.open(message, 'X', {
      duration: duration || 8000,
      panelClass: [theme_new]
    });
  }
}
