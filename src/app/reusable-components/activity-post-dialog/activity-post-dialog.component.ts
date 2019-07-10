import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from 'src/service/activity.service';
import { FormControl, Validators } from '@angular/forms';
import { Constants } from '../../constants';

@Component({
    selector: 'app-activity-post-dialog',
    templateUrl: './activity-post-dialog.component.html',
    styleUrls: ['./activity-post-dialog.component.css', '../../app.component.css']
})
export class ActivityPostDialogComponent {
    activityName = new FormControl('', [Validators.required]);

    constructor(
        public dialogRef: MatDialogRef<ActivityPostDialogComponent>, 
        private activityService: ActivityService,
        private constants: Constants
        ){}
    onNoClick(): void {
        this.dialogRef.close();
    }
}