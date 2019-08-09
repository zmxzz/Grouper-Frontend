import { Component, OnInit } from "@angular/core";
import { MomentService } from 'src/service/moment.service';
import { UserService } from 'src/service/user.service';

@Component({
    selector: 'app-moment-box',
    templateUrl: './moment-box.component.html',
    styleUrls: ['./moment-box.component.css', '../../app.component.css']
})
export class MomentBoxComponent implements OnInit{
    constructor(private userService: UserService , private momentService: MomentService) { }

    momentList: object[] = [];

    ngOnInit() {
        this.getMoment();
    }

    async getMoment() {
        let friendList = await this.userService.getFriendList();
        friendList.push(localStorage.getItem('userId'));
        let momentList = await this.momentService.getMomentFromMultipleUsers(friendList);
        for (let i = 0; i < momentList.length; i++) {
            this.momentList.push(momentList[i]);
        }
    }

}