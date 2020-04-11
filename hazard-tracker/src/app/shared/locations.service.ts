import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Location {
    id: number;
    name: string;
    adress: string;
}

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    apiLocation = 'api/location/';

    /**
     *
     */
    constructor(private http: HttpClient,
                private baseUrl: ApiService) {
    }

    getLocations(): Observable<Array<Location>> {
        return this.http.get<Array<Location>>(this.baseUrl.getBaseUrl()
        + this.apiLocation);
    }

    getLocationById(id: number): Observable<Location> {
        return this.http.get<Location>(this.baseUrl.getBaseUrl()
        + this.apiLocation + id);
    }
}
