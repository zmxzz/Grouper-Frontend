import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';

@Component({
    selector: 'app-notification-box',
    templateUrl: './notification-box.component.html',
    styleUrls: ['./notification-box.component.css']
})
export class NotificationBoxComponent implements OnInit { 
    constructor(private userService: UserService, private communicateService: CommunicateService) {
        this.communicateService.getAcceptFriend()
        .subscribe((userId) => {
            this.friendRequestList = this.friendRequestList.filter((value) => {
                return value !== userId;
            });
        });
        this.communicateService.getDeclineFriend()
        .subscribe((userId) => {
            this.friendRequestList = this.friendRequestList.filter((value) => {
                return value !== userId;
            });
        });
    }

    friendRequestList: string[] = [];
    friendList: string[] = [];
    getAcceptFriend: any;
    getDeclineFriend: any;

    ngOnInit() {
        this.initializeFriendList();
        this.initializeFriendRequest();
    }

    // ngOnDestroy() {
    //     this.getAcceptFriend.unsubscribe();
    //     this.getDeclineFriend.unsubscribe();
    // }

    async initializeFriendRequest() {
        try {
            this.friendRequestList = await this.userService.getFriendRequestList();
        } catch (error) { }
    }

    async initializeFriendList() {
        try {
            this.friendList = await this.userService.getFriendList();
        } catch (error) { }
    }

    getTitle(): string {
        return localStorage.getItem('currentGrouperPage') === 'myFriend' ? 'Friends' : 'Friend Requests';
    }

    getList(): string[] {
        return localStorage.getItem('currentGrouperPage') === 'myFriend' ? this.friendList : this.friendRequestList;
    }

    isFriend(): boolean {
        return localStorage.getItem('currentGrouperPage') === 'myFriend';
    }

}