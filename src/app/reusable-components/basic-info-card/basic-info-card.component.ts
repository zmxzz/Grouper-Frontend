import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';

@Component({
    selector: 'app-basic-info-card',
    templateUrl: './basic-info-card.component.html',
    styleUrls: ['./basic-info-card.component.css', '../../app.component.css']
})
export class BasicInfoCardComponent implements OnInit {
    // userService: communicate with backend to get information
    constructor(private userService: UserService) {}

    userInfo: object;
    fullname: string;
    username: string;
    friendCount: number;
    activityCount: number;
    momentCount: number;

    ngOnInit() {
        // Initialize user's basic information
        this.getUserInfo();
    }

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
    
}