import { Component } from "@angular/core";
import { UserService } from 'src/service/user.service';

@Component({
    selector: 'app-friend-suggestion-box',
    templateUrl: './friend-suggestion-box.component.html',
    styleUrls: ['./friend-suggestion-box.component.css', '../../app.component.css']
})
export class FriendSuggestionBoxComponent {
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.readSuggestionList();
    }

    userSuggestionList: object[] = [];

    // Get friend Suggestions from the server
    async readSuggestionList(): Promise<void> {
        this.userSuggestionList = await this.userService.getFriendSuggestionList();
    }
}