import { Component, OnInit, Input } from "@angular/core";
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';

@Component({
    selector: 'app-notification-card',
    templateUrl: './notification-card.component.html',
    styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit{ 
    constructor(private userService: UserService, private communicateService: CommunicateService) { }

    @Input() request: string;
    @Input() isFriend: boolean;
    userInfo: object;
    username: string;
    lastname: string;
    firstname: string;
    bio: string;

    ngOnInit() {
        this.getRequestUserInfo();
    }

    // Request user's basic info by id
    async getRequestUserInfo() {
        try {
            this.userInfo = await this.userService.getUserBasicInformationById(this.request);
            this.username = this.userInfo['username'];
            this.lastname = this.userInfo['lastname'];
            this.firstname = this.userInfo['firstname'];
            this.bio = this.userInfo['bio'] === undefined ? 'This guy is lazy and left nothing' : this.userInfo['bio'];
        } catch (error) { }
    }

    // Accept friend request
    async accept() {
        try {
            await this.userService.accpetFriendRequest(this.request);
            this.communicateService.acceptFriend(this.request);
        } catch (error) {
            
        }
    }

    // Decline friend request
    async decline() {
        try {
            await this.userService.declineFriendRequest(this.request);
            this.communicateService.declineFriend(this.request);
        } catch (error) {
            
        }
    }

}