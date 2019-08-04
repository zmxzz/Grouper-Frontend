import { HttpHeaders, HttpClient } from '@angular/common/http';
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
}