import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

export interface UserEntity {
    imei: string;
    potentiallyInfected: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    apiLocation = 'api/userinfo/';

    constructor(private http: HttpClient,
        private baseUrl: ApiService) {}

    getStatus(imei: string): string {
        let user: UserEntity;
        this.http.get<UserEntity>(this.baseUrl.getBaseUrl() + this.apiLocation + imei).subscribe(
            (data) => user = data,
            (error) => console.error(error)
        );

        if(user.potentiallyInfected == true) {
            return 'Infected';
        } else {
            return 'Healthy'
        }
    }
}
