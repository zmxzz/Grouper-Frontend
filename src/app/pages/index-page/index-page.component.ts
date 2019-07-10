import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
    selector: 'app-index',
    templateUrl: 'index-page.component.html',
    styleUrls: ['index-page.component.css', '../../app.component.css'],
    providers: [UserService]
})
export class IndexComponent {
    constructor(private userService: UserService) { }

    username: string; // string binding to username input field
    password: string; // string binding to password input field

    // Authenticate useranme and password with server, set authorizing token if logged in
    async login() {
        try {
            let user = await this.userService.login(this.username, this.password);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
}