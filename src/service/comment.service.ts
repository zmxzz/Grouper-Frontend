import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from './config';
import { JsonPipe } from '@angular/common';

@Injectable()
export class CommentService {
    // serverConfig: A class storing server information such as address
    constructor(private http: HttpClient) {}
    // If user is already logged in, initialize grouperUserToken for authorization
    serverAddress: string = ServerConfig.serverAddress; // Ip address of server
    
    async postComment(momentId: string, content: string): Promise<any> {
        // Set up headers, body and options
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', localStorage.getItem('grouperUserToken'));
        headers = headers.set('Content-Type', 'application/json');
        let body = {
            momentId: momentId,
            content: content
        };
        let options = {
            headers: headers
        };
        // Post http requests
        let postComment = new Promise<any>((resolve, reject) => {
            this.http.post(this.serverAddress + '/user/postComment', body, options)
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log('Post Comment Error: ');
                    console.log(error);
                    reject(error);
                }
            );
        });
        return postComment;
    }

    async getComment(commentId: string): Promise<object> {
        // Set up headers, params and options
        let headers = new HttpHeaders().set('Authorization', localStorage.getItem('grouperUserToken'));
        let params = new HttpParams().set('commentId', commentId);
        let options = {
            headers: headers,
            params: params
        };
        // Get http request
        let getComment = new Promise<object>((resolve, reject) => {
            this.http.get(this.serverAddress + '/comment/info', options)
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    console.log('Get Comment Error: ');
                    console.log(error);
                    reject(error);
                }
            );
        });
        return getComment;
    }

}