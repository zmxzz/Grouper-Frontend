import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ServerConfig } from './config';

@Injectable()
export class FileService {
    constructor(private http: HttpClient) {}

    // upload file
    uploadFile(file): Promise<string> {
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

    // download file
    downloadFile(filename): Promise<Blob> {
        const headers = new HttpHeaders().set('authorization', localStorage.getItem('grouperUserToken'));
        const params = new HttpParams().set('filename', filename);
        let options = {
            headers: headers,
            params: params,
            responseType: 'blob' as 'blob'
        };
        let downloadFile = new Promise<Blob>((resolve, reject) => {
            this.http.get(ServerConfig.serverAddress + '/file/download', options)
            .subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
        return downloadFile;
    }

}