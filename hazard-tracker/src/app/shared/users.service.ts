import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    imei: string;
    isInfected: boolean;
    potentialInfectionDate: Date;
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    apiLocation = 'http://localhost:5000/api/userinfo/';

    constructor(private http: HttpClient) { }

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

                this.http.post<User>(this.apiLocation, user).subscribe();
            },
            (error) => console.error(error)
        );
    }

    // Connection-specific DNS Suffix  . :
    // Link-local IPv6 Address . . . . . : fe80::d1e1:585b:7d9f:9f81%12
    // IPv4 Address. . . . . . . . . . . : 192.168.1.16
    // Subnet Mask . . . . . . . . . . . : 255.255.255.0
    // Default Gateway . . . . . . . . . : fe80::1%12
    //                                     192.168.1.1

    getUser(imei: string): Observable<User> {
        const api = this.apiLocation + imei;

        try {
        return this.http.get<User>('http://192.168.1.16:5000/api/userinfo/ooooo', {});
        } catch (e) {
            const a = e;
        }
    }
}
