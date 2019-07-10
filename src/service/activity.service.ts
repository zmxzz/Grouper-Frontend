import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from './config';

@Injectable()
export class ActivityService {
    // serverConfig: A class storing server information such as addres
    constructor(private http: HttpClient) {}
}