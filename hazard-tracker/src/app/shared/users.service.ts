import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
    id: number;
    imei: string;
    isInfected: boolean;
    deviceToken: string;
    potentialInfectionDate: Date;
}

class UserClass implements User {
    constructor(
        public id: number,
        public imei: string,
        public isInfected: boolean,
        public deviceToken: string,
        public potentialInfectionDate: Date) {}
}

// tslint:disable-next-line: max-classes-per-file
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
                    const newUser = new UserClass(0, imei, false, '', new Date(1901, 1));
                    this.addUser(newUser);
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
                    const newUser = new UserClass(0, imei, false, '', new Date(1901, 1));
                    this.addUser(newUser);
                }

                user.deviceToken = token;

                this.http.put<User>(this.baseUrl.getBaseUrl() + this.apiLocation + 'token', user).subscribe();
            },
            (error) => {
                console.error(error);
                const newUser = new UserClass(0, imei, false, token, new Date(1901, 1));
                this.addUser(newUser);
            }
        );
    }

    getUser(imei: string): Observable<User> {
        return this.http.get<User>(this.baseUrl.getBaseUrl() + this.apiLocation + imei);
    }

    addUser(user: User): void {
        this.http.post<User>(this.baseUrl.getBaseUrl() + this.apiLocation, user).subscribe();
    }
}
