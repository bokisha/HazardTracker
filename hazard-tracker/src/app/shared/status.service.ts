import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { User } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    apiLocation = 'api/userinfo/';

    constructor(private http: HttpClient,
                private baseUrl: ApiService) { }

    getStatus(imei: string): Observable<User> {
        return this.http.get<User>(this.baseUrl.getBaseUrl() + this.apiLocation + imei);
    }
}
