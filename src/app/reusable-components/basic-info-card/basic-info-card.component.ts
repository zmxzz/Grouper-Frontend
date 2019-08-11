import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';

@Component({
    selector: 'app-basic-info-card',
    templateUrl: './basic-info-card.component.html',
    styleUrls: ['./basic-info-card.component.css', '../../app.component.css']
})
export class BasicInfoCardComponent implements OnInit {
    // userService: communicate with backend to get information
    constructor(private userService: UserService, private communicateService: CommunicateService) {
        this.getAcceptFriend = this.communicateService.getAcceptFriend()
        .subscribe(
            (userId) => {
                this.friendCount++;
            }
        );
    }

    userInfo: object;
    fullname: string;
    username: string;
    friendCount: number;
    activityCount: number;
    momentCount: number;
    getAcceptFriend: any;

    ngOnInit() {
        // Initialize user's basic information
        this.getUserInfo();
    }
    //  ngOnDestroy() {
    //      this.getAcceptFriend.unsubscribe();
    //  }


    async getUserInfo() {
        try {
            let userInfo = await this.userService.getUserBasicInformation();
            this.userInfo = userInfo;
            this.userInfo['firstname'] = this.userInfo['firstname'].length === 0 ? 'N/A' : this.userInfo['firstname'];
            this.fullname = this.userInfo['firstname'] + ' ' + this.userInfo['lastname'];
            this.username = '@' + this.userInfo['username'];
            this.friendCount = this.userInfo['friendCount'];
            this.activityCount = this.userInfo['activityCount'];
            this.momentCount = this.userInfo['momentCount'];
            localStorage.setItem('userId', this.userInfo['_id']);
        } catch (error) {
            console.log(error);
        }
    }

    showMyEvent(): void {
        this.communicateService.showMyEvent();
    }

    showMyMoment(): void {
        this.communicateService.showMyMoment();
    }

    showMyFriend(): void {
        this.communicateService.showMyFriend();
    }
    
}