import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from './config';

@Injectable()
export class ActivityService {
    // serverConfig: A class storing server information such as addres
    constructor(private http: HttpClient) {}
    // If user is already logged in, initialize grouperUserToken for authorization
    serverAddress: string = ServerConfig.serverAddress; // Ip address of server

    // Post activity service
    async postActivity(activity: object): Promise<object> {
        // Initialize headers
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', localStorage.getItem('grouperUserToken'));
        headers = headers.set('Content-Type', 'application/json');
        const options = {
            headers: headers,
            responseType: 'text' as 'text'
        };

        // Initialize promise
        let postActivity = new Promise<object>((resolve, reject) => {
            // Make post request
            this.http.post(this.serverAddress + '/user/postActivity', activity, options)
            .subscribe(
                (result) => {
                    resolve(JSON.parse(result));
                },
                (error) => {
                    console.log('Post activity error: ');
                    console.log(error);
                    reject(error);
                }
            );
        });
        return postActivity;
    }

    // Get activities information with an activity list
    async getActivityList(organizerIdList: string[]): Promise<object[]> {
        let getActivityList = new Promise<object[]>((resolve, reject) => {
            // Set up headers
            let headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
            // Set up query
            let params = new HttpParams().set('organizerIdList', organizerIdList.join(', '));
            const options = {
                headers: headers,
                params: params,
                responseType: 'text' as 'text'
            };
            this.http.get(this.serverAddress + '/activity/activityList', options)
            // Listening to result
            .subscribe(
                (result) => {
                    resolve(JSON.parse(result));
                },
                (error) => {
                    reject(error);
                }
            )
        });
        return getActivityList;
    }

    // Put user into participant list
    async addParticipant(activityId: string): Promise<void> {
        let addParticipant = new Promise<void>((resolve, reject) => {
            // Set up headers
            let headers = new HttpHeaders();
            headers = headers.set('Authorization', localStorage.getItem('grouperUserToken'));
            headers = headers.set('Content-Type', 'application/json');
            // Set up body
            let body = {
                activityId: activityId
            };
            // Set up options
            let options = {
                headers: headers,
                responseType: 'text' as 'text'
            };
            this.http.post(this.serverAddress + '/user/joinActivity', body, options)
            .subscribe(
                (result) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return addParticipant;
    }

    // Remove user from participant list
    async removeParticipant(activityId: string): Promise<void> {
        let removeParticipant = new Promise<void>((resolve, reject) => {
            // Set up headers
            let headers = new HttpHeaders();
            headers = headers.set('Authorization', localStorage.getItem('grouperUserToken'));
            headers = headers.set('Content-Type', 'application/json');
            // Set up body
            let body = {
                activityId: activityId
            };
            // Set up options
            let options = {
                headers: headers,
                responseType: 'text' as 'text'
            };
            this.http.post(this.serverAddress + '/user/quitActivity', body, options)
            .subscribe(
                (result) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return removeParticipant;
    }
    
}