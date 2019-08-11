import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';

@Component({
    selector: 'app-friend-suggestion-box',
    templateUrl: './friend-suggestion-box.component.html',
    styleUrls: ['./friend-suggestion-box.component.css', '../../app.component.css']
})
export class FriendSuggestionBoxComponent implements OnInit {
    constructor(private userService: UserService, private communicateService: CommunicateService) {
        this.getRemoveSuggestion = this.communicateService.getRemoveSuggestion()
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

    // ngOnDestroy() {
    //     this.getRemoveSuggestion.unsubscribe();
    // }

    userSuggestionList: object[] = [];
    getRemoveSuggestion: any;

    // Get friend Suggestions from the server
    async readSuggestionList(): Promise<void> {
        this.userSuggestionList = await this.userService.getFriendSuggestionList();
    }
}