import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NavigationService } from 'src/service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Constructor with two service
  // UserService: Service communicating with backend
  // NavigationService: Page control service
  constructor(private userService: UserService, private navigationService: NavigationService) {
    this.navigationService.getPage()
    .subscribe(nextPage => {
      console.log(nextPage);
      this.selectedPage = nextPage;
    });
  }

  ngOnInit() {
    this.selectedPage = 'home';
  }

  selectedPage: string;

  // returns true if the user is currently logged in
  isLoggedIn(): boolean{
    let grouperUserToken = localStorage.getItem('grouperUserToken');
    return grouperUserToken !== null && grouperUserToken !== '';
  }

  // Call logout function to destroy token
  logout(): void {
    this.userService.logout();
  }

}
