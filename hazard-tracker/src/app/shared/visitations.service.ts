import { Location } from '~/app/shared/locations.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface Visitation {
    id?: number;
    imei: string;
    enterTime?: Date;
    exitTime?: Date;
    location?: Location;
    locationId: number;
}

@Injectable({
    providedIn: 'root'
})
export class VisitationsService {

    apiLocation = 'api/visitation/';

    constructor(private http: HttpClient, private baseUrl: ApiService) { }

    getAllVisitationsForImei(imei: string): Observable<Array<Visitation>> {
        return interval(1000).pipe(
            switchMap(() => {
                return this.http.get<Array<Visitation>>(this.baseUrl.getBaseUrl()
                                                        + this.apiLocation
                                                        + 'getAllVisitationsForImei/'
                                                        + imei);
            })
        );
    }

    getAllVisitationsForLocation(locationId: number): Observable<Array<Visitation>> {
        return this.http.get<Array<Visitation>>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'getAllVisitationsForLocation/'
        + locationId);
    }

    getLatestVisitation(visitation: Visitation): Observable<Visitation> {
        return this.http.get<Visitation>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'getLatestVisitation?imei=' + visitation.imei + '&locationId=' + visitation.locationId);
    }

    getVisitationById(visitationId: number): Observable<Visitation> {
        return this.http.get<Visitation>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + visitationId);
    }

    addNewVisitation(visitation: Visitation): void {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.post<Visitation>(this.baseUrl.getBaseUrl() + this.apiLocation + 'addVisitation',
                                   visitation, {headers})
                 .subscribe();
    }

    updateVisitation(visitation: Visitation): void {
        this.http.put<Visitation>(this.baseUrl.getBaseUrl() + this.apiLocation + 'updateVisitation', visitation)
                 .subscribe();
    }
}
