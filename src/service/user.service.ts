import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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
    async login(username: string, password: string): Promise<string> {
        // Set up headers
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        // Initialize promise
        let loginRequest = new Promise<string>((resolve, reject) => {
            // make post request
            this.http.post(this.serverAddress + "/user/login",
            {
                "username": username,
                "password": password
            }, { 
                headers: headers,
                responseType: 'text'
             })
            .subscribe(
                (result) => {
                    localStorage.setItem('grouperUserToken', result); // Set up user token if logged in
                    localStorage.setItem('lastLogin', new Date().toString()); // Set up last login day
                    resolve(result);
                },
                (error) => {
                    console.log('Error: ' + error)
                    reject(error); // If the request is not accepted, reject the login request
                }
            );
        });
        return loginRequest;
    }

    // Destroy both token and last login date
    logout(): void {
        localStorage.removeItem('grouperUserToken');
        localStorage.removeItem('lastLogin');
        localStorage.removeItem('userId');
    }

    // Get user's basic information
    async getUserBasicInformation(): Promise<object> {
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

    // Get user's firstname lastname  and username by id
    async getUserBasicInformationById(userId: string): Promise<object> {
        let getUserBasicInformationById = new Promise<object>((resolve, reject) => {
            let params = new HttpParams().set('userId', userId);
            this.http.get(this.serverAddress + '/user/infoById', {params: params})
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return getUserBasicInformationById;
    }

    // Get user's friends' ids
    async getFriendList(): Promise<string[]> {
        let getFriendList = new Promise<string[]>((resolve, reject) => {
            // Set up headers
            const headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
            // Set up options
            const options = {
                headers: headers,
                responseType: 'text' as 'text'
            };
            // GET Request
            this.http.get(this.serverAddress + '/user/friendList', options)
            // Listening to result
            .subscribe(
                // Resolve with result, reject with error
                (result) => {
                    resolve(JSON.parse(result));
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return getFriendList;
    }

    // Check if the user's token has expired or not
    isLoggedIn(): boolean  {
        let grouperUserToken = localStorage.getItem('grouperUserToken');
        let lastLoginDate = localStorage.getItem('lastLogin');
        return grouperUserToken !== null && 
        grouperUserToken !== '' &&
        lastLoginDate !== null &&
        (new Date().getTime() - new Date(lastLoginDate).getTime()) < (3600 * 24 * 1000);  
    }

    // Join activity with given id
    async joinActivity(activityId: string): Promise<object> {
        let joinActivity = new Promise<object>((resolve, reject) => {
            // Set up headers with token
            const headers = new HttpHeaders().set('Authorization', localStorage.getIteme('grouperUserToken'));
            // Set up options
            const options = {
                headers: headers,
                body: 'application/json',
                responseType: 'text' as 'text'
            };
            // POST request
            this.http.post(this.serverAddress + '/user/joinActivity', { activityId: activityId }, options)
            .subscribe(
                (result) => {
                    resolve(JSON.parse(result));
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return joinActivity;
    }

    // Delete activity from the database
    async disbandActivity(activityId: string): Promise<object> {
        let disbandActivity = new Promise<object> ((resolve, reject) => {
            const headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
            let params = new HttpParams().set('activityId', activityId);
            this.http.delete(this.serverAddress + '/user/disbandActivity', {
                headers: headers,
                params: params
            })
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return disbandActivity;
    }

    // Get Friend Suggetions 
    async getFriendSuggestionList(): Promise<object[]> {
        let getFriendSuggestionList = new Promise<object[]>((resolve, reject) => {
            // Set up headers
            let headers = new HttpHeaders();
            headers = headers.set('Authorization', localStorage.getItem('grouperUserToken'));
            // Set up options
            let options = {
                headers: headers,
                responseType: 'text' as 'text'
            };
            this.http.get(this.serverAddress + '/user/friendSuggestionList', options)
            .subscribe(
                (result) => {
                    // If there is a problem with result format, reject with error.
                    try {
                        resolve(JSON.parse(result));
                    } catch (error) {
                        console.log(error)
                        reject(error);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return getFriendSuggestionList;
    }

    // Send Friend Request
    async sendFriendRequest(userId: string): Promise<void> {
        let sendFriendRequest = new Promise<void>((resolve, reject) => {
            // Set up headers, bodies and options
            let headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
            let body = { userId: userId };
            let options = {
                headers: headers,
                responseType: 'text' as 'text'
            };
            // Post http request
            this.http.post(this.serverAddress + '/user/sendFriendRequest', body, options)
            .subscribe(
                (result) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return sendFriendRequest;
    }
    
}