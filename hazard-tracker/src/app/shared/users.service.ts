import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
    id: number;
    imei: string;
    isInfected: boolean;
    token: string;
    potentialInfectionDate: Date;
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    apiLocation = 'api/userinfo/';

    constructor(private http: HttpClient,
                private baseUrl: ApiService) { }

    postHazard(imei: string, numberOfDays: number): void {
        this.getUser(imei).subscribe(
            (data) => {
                const user = data;

                if (user === undefined) {
                    throw new Error('Error getting user information');
                }

                user.isInfected = true;

                const date = new Date();
                date.setDate(date.getDate() - numberOfDays);
                user.potentialInfectionDate = date;

                this.http.put<User>(this.baseUrl.getBaseUrl() + this.apiLocation, user).subscribe();
            },
            (error) => console.error(error)
        );
    }

    postToken(imei: string, token: string): void {
        this.getUser(imei).subscribe(
            (data) => {
                const user = data;

                if (user === undefined) {
                    throw new Error('Error getting user information');
                }

                user.token = token;

                this.http.put<User>(this.baseUrl.getBaseUrl() + this.apiLocation + "token", user).subscribe();
            },
            (error) => console.error(error)
        );
    }

    getUser(imei: string): Observable<User> {
        return this.http.get<User>(this.baseUrl.getBaseUrl() + this.apiLocation + imei);
    }
}
