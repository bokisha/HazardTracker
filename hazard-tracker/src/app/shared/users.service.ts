import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
    imei: string;
    potentiallyInfected: boolean;
    potentialInfectionDate: Date;
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    apiLocation = 'api/user/';

    constructor(private http: HttpClient) {}

    postHazard(imei: string, numberOfDays: number): void {
        const user = this.getUser(imei);

        user.potentiallyInfected = true;

        const date = new Date();
        date.setDate(date.getDate() - numberOfDays);
        user.potentialInfectionDate = date;

        this.http.post<User>(this.apiLocation, user);
    }

    getUser(imei: string): User {
        let user: User;
        this.http.get<User>(this.apiLocation + imei).subscribe(
            (data) => user = data,
            (error) => console.error(error)
        );

        return user;
    }
}
