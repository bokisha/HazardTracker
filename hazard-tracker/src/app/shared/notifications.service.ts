import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Notification {
    id: number;
    notificationText: string;
    userId: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    apiLocation = 'api/notification/';

    constructor(private http: HttpClient, private baseUrl: ApiService) { }

    getAllNotificationsForUser(imei: string): Observable<Array<Notification>> {
        return this.http.get<Array<Notification>>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'getAllNotificationsForUser/'
        + imei);
    }

}
