import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from './config';

@Injectable()
export class MomentService {
    // serverConfig: A class storing server information such as address
    constructor(private http: HttpClient) {}
    // If user is already logged in, initialize grouperUserToken for authorization
    serverAddress: string = ServerConfig.serverAddress; // Ip address of server
    
    // Post moment service
    postMoment(moment: object): Promise<object> {
        // Initialize headers
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', localStorage.getItem('grouperUserToken'));
        headers = headers.set("Content-Type", "application/json");
        // Initialize promise
        let postMoment = new Promise<object>((resolve, reject) => {
            // Make post request
            this.http.post(this.serverAddress + '/user/postMoment', moment, { headers})
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
        return postMoment;
    }

    // Get moment posted by single user
    getMomentFromSingleUser(userId: string): Promise<object[]> {
        // Initialize headers, params, options
        let headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
        let params = new HttpParams().set('userId', userId);
        let options = {
            headers: headers,
            params: params
        };
        let getMomentFromSingleUser = new Promise<object[]>((resolve, reject) => {
            this.http.get(ServerConfig.serverAddress + '/moment/momentBySingleUser', options)
            .subscribe(
                (result: object[]) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return getMomentFromSingleUser;
    }

    // Get moment posted by a list of users
    getMomentFromMultipleUsers(userIdList: string[]): Promise<object[]> {
        // Initialize headers, params, options
        let headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
        let params = new HttpParams().set('userIdList', JSON.stringify(userIdList));
        let options = {
            headers: headers,
            params: params
        };
        let getMomentFromMultipleUsers = new Promise<object[]>((resolve, reject) => {
            this.http.get(ServerConfig.serverAddress + '/moment/momentByMultipleUsers', options)
            .subscribe(
                (result: object[]) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return getMomentFromMultipleUsers;
    }
}