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
    });
  }

  ngOnInit() {
    this.selectedPage = 'moments';
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
