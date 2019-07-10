import { Component, Output } from '@angular/core';
import { NavigationService } from 'src/service/navigation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityPostDialogComponent } from '../activity-post-dialog/activity-post-dialog.component';

@Component({
    selector: 'app-top-nav-bar',
    templateUrl: './top-nav-bar.html',
    styleUrls: ['./top-nav-bar.css', '../../app.component.css']
})
export class TopNavBarComponent {
    constructor(private navigationService: NavigationService, public dialog: MatDialog) {}

    sendPage(page: string) {
        this.navigationService.changePage(page);
    }

    openDialog(): void {
        this.dialog.open(ActivityPostDialogComponent, {
          width: '500px'
        });
      }

}