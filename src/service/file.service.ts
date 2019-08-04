import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ServerConfig } from './config';

@Injectable()
export class FileService {
    constructor(private http: HttpClient) {}

    // Server that helps with uploading files
    uploadFile(file) {
        const formData = new FormData();
        const headers = new HttpHeaders();
        headers.set('Authorization', localStorage.getItem('grouperUserToken'));
        headers.set('Content-Type', 'multipart/form-data');
        formData.append('file', file);
        let uploadFile = new Promise<string>((resolve, reject) => {
            this.http.post(ServerConfig.serverAddress + '/file/upload', formData, { headers })
            .subscribe(
                res => {
                    resolve(res['result']);
                },
                error => {
                    reject(error);
                }
            );
        });
        return uploadFile;
    }
}