import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, AbstractControl} from '@angular/forms';
import { ActivityService } from '../../..//service/activity.service';
import { InputOptionService } from '../../utils/input-option.service';
import { ObjectBuilderService } from '../../../service/object-builder.service';
import { CommunicateService } from '../../../service/communicate.service';
@Component({
    selector: 'app-activity-post-dialog',
    templateUrl: './activity-post-dialog.component.html',
    styleUrls: ['./activity-post-dialog.component.css', '../../app.component.css']
})
export class ActivityPostDialogComponent {
    activityName: string;
    introduction: string = '';
    category: string = '';
    year: number;
    month: string;
    day: number;
    hour: string;
    minute: string;
    state: string;
    city: string;
    address: string;
    groupSize = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(1000000)]);

    // dialogRef: Floating Dialog Component
    // activityService: Service helps communicate with backend
    // constants: form options
    constructor(
        public dialogRef: MatDialogRef<ActivityPostDialogComponent>, 
        private activityService: ActivityService,
        private inputOptionService: InputOptionService,
        private objectBuilderService: ObjectBuilderService,
        private communicateService: CommunicateService
        ){}
    onCancelClick(): void {
        this.dialogRef.close();
    }

    // Check whether input is not null or empty
    isNumber(): boolean {
        let size = parseInt(this.groupSize.value);
        return !isNaN(size) && (size <= 1000000);
    }

    // Get group size error message
    getGroupSizeError(): string {
        let size = parseInt(this.groupSize.value);
        if (this.groupSize.value === '') {
            return 'Please enter group size';
        }
        if (size > 1000000) {
            return 'Group Size cannot be larger than a million';
        }
        return 'Please enter number only';
    }

    // Send Activity to server and close the dialog
    async postActivity(): Promise<object> {
        // If required field is not filled, do nothing
        if (!this.requiredAreFilled()) {
            console.log('Not');
            return;
        }
        let activity = this.objectBuilderService.buildActivity(
            this.activityName, 
            this.introduction, 
            this.category, 
            this.year, 
            this.month, 
            this.day, 
            this.hour, 
            this.minute,
            this.state,
            this.city,
            this.address,
            this.groupSize.value
            );
        this.dialogRef.close();
        try {
            let result = await this.activityService.postActivity(activity);
            this.communicateService.postActivity(result);
        } catch (error) {
            Promise.reject(error);
            alert('Acitivity Post Failed');
        }
    }

    isValidInput(input: string): boolean {
        return input !== undefined && input !== '';
    }

    requiredAreFilled(): boolean {
        return this.activityName !== undefined && 
        this.activityName !== '' &&
        this.year !== undefined && 
        this.month !== undefined && 
        this.day !== undefined &&
        this.hour !== undefined &&
        this.minute !== undefined &&
        this.state !== undefined &&
        this.state !== '' &&
        this.city !== undefined &&
        this.city !== '' &&
        this.address !== undefined &&
        this.address !== '' &&
        this.isNumber();
    }

}