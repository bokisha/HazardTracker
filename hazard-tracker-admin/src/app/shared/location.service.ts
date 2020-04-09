import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../shared/location';


@Injectable({
    providedIn: 'root'
})
export class LocationService {

    apiLocation = 'api/location';

    constructor(private http: HttpClient) { }

    addLocation (location : Location): Observable<Location> {
        return this.http.post<Location>(this.apiLocation, location);
    }

}

