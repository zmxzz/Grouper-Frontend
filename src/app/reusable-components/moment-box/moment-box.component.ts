import { Component, OnInit, OnDestroy } from "@angular/core";
import { MomentService } from 'src/service/moment.service';
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';

@Component({
    selector: 'app-moment-box',
    templateUrl: './moment-box.component.html',
    styleUrls: ['./moment-box.component.css', '../../app.component.css']
})
export class MomentBoxComponent implements OnInit {
    constructor(private userService: UserService , private momentService: MomentService, private communicateService: CommunicateService) {
        this.communicateService.getNewMoment()
        .subscribe(
            (moment) => {
                if (moment !== null && moment !== undefined) {
                    this.momentList = [moment].concat(this.momentList);
                }
            }
        );
        this.communicateService.getShowMyMoment()
        .subscribe(() => {
            if (localStorage.getItem('currentGrouperPage') === 'myMoment') {
                this.getMyMoment();
            }
        });

        this.communicateService.getPage()
        .subscribe((page) => {
            if (page === 'moments') {
                this.getMoment();
            }
        });
    }

    momentList: object[] = [];

    ngOnInit() {
        localStorage.getItem('currentGrouperPage') === 'myMoment' ? this.getMyMoment() : this.getMoment();
    }

    // ngOnDestroy() {
    //     this.getNewMoment.unsubscribe();
    // }

    async getMoment() {
        let friendList = await this.userService.getFriendList();
        friendList.push(localStorage.getItem('userId'));
        this.momentList = await this.momentService.getMomentFromMultipleUsers(friendList);
    }

    async getMyMoment() {
        this.momentList = await this.momentService.getMomentFromSingleUser(localStorage.getItem('userId'));
    }
}