import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
                    this.activityList = [activity].concat(this.activityList);
                }
            });

            this.communicateService.getShowMyEvent()
            .subscribe(() => {
                if (localStorage.getItem('currentGrouperPage') === 'myHome') {
                    this.initMyActivityList();
                }
            });

            this.communicateService.getPage()
            .subscribe((page) => {
                if (page === 'home') {
                    this.initActivityList();
                }
            });
    }

    ngOnInit() {
        localStorage.getItem('currentGrouperPage') === 'myHome' ? this.initMyActivityList() : this.initActivityList();
    }

    // boolean indicates whether only show my event or not
    @Input() myHome: boolean;
    activityList: object[] = [];

    async initActivityList(): Promise<void> {
        let oragnizerIdList = await this.userServie.getFriendList();
        oragnizerIdList.push(localStorage.getItem('userId'));
        this.activityList = await this.activityService.getActivityList(oragnizerIdList);
        this.activityList = this.activityList.splice(0, 20);
    }

    async initMyActivityList(): Promise<void> {
        this.activityList = await this.activityService.getActivityList([localStorage.getItem('userId')]);
    }

}