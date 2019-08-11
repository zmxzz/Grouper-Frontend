import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommunicateService } from '../service/communicate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // Constructor with two service
    // UserService: Service communicating with backend
    // CommunicateService: Page control service
    constructor(private userService: UserService, private communicateService: CommunicateService) {
        this.communicateService.getPage()
        .subscribe(nextPage => {
            this.selectedPage = nextPage;
            localStorage.setItem('currentGrouperPage', nextPage);
        });

        this.communicateService.getShowMyEvent()
        .subscribe(() => {
            this.selectedPage = 'myHome';
            localStorage.setItem('currentGrouperPage', 'myHome');
        });

        this.communicateService.getShowMyMoment()
        .subscribe(() => {
            this.selectedPage = 'myMoment';
            localStorage.setItem('currentGrouperPage', 'myMoment');
        });

        this.communicateService.getShowMyFriend()
        .subscribe(() => {
            this.selectedPage = 'myFriend';
            localStorage.setItem('currentGrouperPage', 'myFriend');
        });
    }

    ngOnInit() {
        this.selectedPage = 'home';
        localStorage.setItem('currentGrouperPage', 'home');
    }

    selectedPage: string;

    // returns true if the user is currently logged in
    isLoggedIn(): boolean{
        return this.userService.isLoggedIn();
    }

    // Call logout function to destroy token
    logout(): void {
        this.userService.logout();
    }

}
