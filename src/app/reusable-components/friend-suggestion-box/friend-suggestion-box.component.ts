import { Component } from "@angular/core";
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';

@Component({
    selector: 'app-friend-suggestion-box',
    templateUrl: './friend-suggestion-box.component.html',
    styleUrls: ['./friend-suggestion-box.component.css', '../../app.component.css']
})
export class FriendSuggestionBoxComponent {
    constructor(private userService: UserService, private communicateService: CommunicateService) {
        this.communicateService.getRemoveSuggestion()
        .subscribe(
            (userId) => {
                this.userSuggestionList = this.userSuggestionList.filter((value, index, array) => {
                    return value['_id'] !== userId;
                })
            }
        )
    }

    ngOnInit() {
        this.readSuggestionList();
    }

    userSuggestionList: object[] = [];

    // Get friend Suggestions from the server
    async readSuggestionList(): Promise<void> {
        this.userSuggestionList = await this.userService.getFriendSuggestionList();
    }
}