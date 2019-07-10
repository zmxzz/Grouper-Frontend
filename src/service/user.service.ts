import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from './config';

@Injectable()
export class UserService {
    // serverConfig: A class storing server information such as address
    constructor(private http: HttpClient) {}
    // If user is already logged in, initialize grouperUserToken for authorization
    grouperUserToken: string = localStorage.getItem('grouperUserToken') === null ? '' : localStorage.getItem('grouperUserToken');
    serverAddress: string = ServerConfig.serverAddress; // Ip address of server

    // Log in service: return a promise on making login request
    async login(username: string, password: string): Promise<object> {
        // Set up headers
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        // Initialize promise
        let loginRequest = new Promise<object>((resolve, reject) => {
            // make post request
            this.http.post(this.serverAddress + "/user/login",
            {
                "username": username,
                "password": password
            }, { headers })
            .subscribe(
                (result) => {
                    localStorage.setItem('grouperUserToken', result['result']); // Set up user token if logged in
                    setTimeout(() => {
                        if (result['result'] === localStorage.getItem('grouperUserToken')) {
                            localStorage.removeItem('grouperUserToken');
                        }
                    }, 86400000);
                    resolve(result);
                },
                (error) => {
                    reject(error); // If the request is not accepted, reject the login request
                }
            );
        });
        return loginRequest;
    }

    // Log out service: return a promise on making logout request
    logout(): void {
        localStorage.removeItem('grouperUserToken');
    }

    // Get user's basic information
    async getUserBasicInformation() {
        let getUserBasicInformation = new Promise<Object>((resolve, reject) => {
            const headers = new HttpHeaders().set("Authorization", localStorage.getItem('grouperUserToken'));
            // Make GET request
            this.http.get(this.serverAddress + '/user/info', { headers: headers})
            .subscribe(
                // If result is valid, resolve
                (userInfo) => {
                    resolve(userInfo);
                },
                // Otherwise reject
                (error) => {
                    reject(error);
                }
            );
        });
        return getUserBasicInformation;
    }
    
}