import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { User } from './users.service';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    apiLocation = 'api/userinfo/';

    constructor(private http: HttpClient,
                private baseUrl: ApiService) { }

    getStatus(imei: string): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl.getBaseUrl() + this.apiLocation + 'getStatus/' + imei);
    }
}
