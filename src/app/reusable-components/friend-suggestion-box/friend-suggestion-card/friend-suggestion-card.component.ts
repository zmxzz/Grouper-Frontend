import { Component, Input, OnInit } from "@angular/core";
import { CommunicateService } from 'src/service/communicate.service';
import { UserService } from 'src/service/user.service';

@Component({
    selector: 'app-friend-suggestion-card',
    templateUrl: './friend-suggestion-card.component.html',
    styleUrls: ['./friend-suggestion-card.component.css', '../../../app.component.css']
})
export class FriendSuggestionCardComponent implements OnInit {

    constructor(private comminucateService: CommunicateService, private userService: UserService) { }

    @Input() userInfo: object;
    username: string;
    lastname: string;
    firstname: string;
    userId: string;

    ngOnInit() {
        this.username = this.userInfo['username'];
        this.lastname = this.userInfo['lastname'];
        this.firstname = this.userInfo['firstname'];
        this.userId = this.userInfo['_id'];
    }

    async sendFriendRequest(): Promise<void> {
        // Send Friend Request
        // Remove activity
        try {
            await this.userService.sendFriendRequest(this.userId);
        } catch (error) {
            console.log(error);
        }
        this.removeSuggestion();
    }

    removeSuggestion(): void {
        this.comminucateService.removeSuggestion(this.userId);
    }

}