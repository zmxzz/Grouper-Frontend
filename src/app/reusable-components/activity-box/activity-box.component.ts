import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ActivityService } from '../../../service/activity.service';
import { CommunicateService } from '../../../service/communicate.service';

@Component({
    selector: 'app-activity-box',
    templateUrl: './activity-box.component.html',
    styleUrls: ['activity-box.component.css', '../../app.component.css']
})
export class ActivityBoxComponent implements OnInit{
    constructor(
        private userServie: UserService, 
        private activityService: ActivityService, 
        private communicateService: CommunicateService) { 
        this.communicateService.getRemoveActivity()
        .subscribe(activityId => {
            for (let i: number = 0; i < this.activityList.length; i++) {
                if (this.activityList[i]['_id'] == activityId) {
                    this.activityList.splice(i, 1);
                    break;
                }
            }
        });

        this.communicateService.getNewActivity()
        .subscribe(activity => {
            if (activity !== null) {
                this.activityList.push(activity);
            }
        });
    }

    ngOnInit() {
        this.initActivityList();
    }

    activityList: object[] = [];

    async initActivityList(): Promise<void> {
        let oragnizerIdList = await this.userServie.getFriendList();
        oragnizerIdList.push(localStorage.getItem('userId'));
        this.activityList = await this.activityService.getActivityList(oragnizerIdList);
        this.activityList = this.activityList.splice(0, 10);
    }

}