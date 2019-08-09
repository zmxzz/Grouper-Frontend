import { MatDialog } from '@angular/material/dialog';
import { Component, Output, OnInit } from '@angular/core';
import { CommunicateService } from '../../../service/communicate.service';
import { ActivityPostDialogComponent } from '../activity-post-dialog/activity-post-dialog.component';
import { MomentPostDialogComponent } from '../moment-post-dialog/moment-post-dialog.component';

@Component({
    selector: 'app-top-nav-bar',
    templateUrl: './top-nav-bar.component.html',
    styleUrls: ['./top-nav-bar.component.css', '../../app.component.css']
})
export class TopNavBarComponent {
    constructor(
      private communicateService: CommunicateService, 
      public dialog: MatDialog
      ) {}

    sendPage(page: string) {
        this.communicateService.changePage(page);
    }

    // Open a floating dialog requiring activity form
    openActivityDialog(): void {
      this.dialog.open(ActivityPostDialogComponent, {
        width: '500px'
      });
    }

    // Open a floating dialog requiring moment form
    openMomentDialog(): void {
      this.dialog.open(MomentPostDialogComponent,  {
        width: '500px'
      });
    }

    logout(): void {
      localStorage.removeItem('grouperUserToken');
    }

}