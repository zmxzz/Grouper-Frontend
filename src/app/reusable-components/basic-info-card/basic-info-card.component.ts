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
            localStorage.setItem('userId', this.userInfo['_id']);
        } catch (error) {
            console.log(error);
        }
    }
    
}