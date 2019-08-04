import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-friend-suggestion-card',
    templateUrl: './friend-suggestion-card.component.html',
    styleUrls: ['./friend-suggestion-card.component.css', '../../app.component.css']
})
export class FriendSuggestionCardComponent implements OnInit {
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

}