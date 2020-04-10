import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Visitation {
    id: number;
    imei: string;
    enterTime: Date;
    exitTime: Date;
    locationId: number;
}

@Injectable({
    providedIn: 'root'
})
export class VisitationsService {

    apiLocation = 'api/visitation/';

    constructor(private http: HttpClient, private baseUrl: ApiService) { }

    getAllVisitationsForImei(imei: string): Observable<Array<Visitation>> {
        return this.http.get<Array<Visitation>>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'getAllVisitationsForImei/'
        + imei);
    }

    getAllVisitationsForLocation(locationId: number): Observable<Array<Visitation>> {
        return this.http.get<Array<Visitation>>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'getAllVisitationsForLocation/'
        + locationId);
    }

    getLatestVisitation(visitationDto: Visitation): Observable<Visitation> {
        return this.http.get<Visitation>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'getLatestVisitation?imei=' + visitationDto.imei + '&locationId=' + visitationDto.locationId);
    }

    getVisitationById(visitationId: number): Observable<Visitation> {
        return this.http.get<Visitation>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + visitationId);
    }

    addNewVisitation(visitationDto: Visitation): void {
        this.http.post<Visitation>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'addVisitation',
        visitationDto);
    }

    updateVisitation(visitationDto: Visitation): void {
        this.http.put<Visitation>(this.baseUrl.getBaseUrl()
        + this.apiLocation
        + 'updateVisitation',
        visitationDto);
    }

    private items = new Array<Visitation>(
        {
            id: 1,
            imei: '990000862471854',
            enterTime: new Date(2020, 4, 2, 13, 43, 12),
            exitTime: new Date(2020, 4, 2, 14, 3, 42),
            locationId: 1
        },
        {
            id: 2,
            imei: '351756051523999',
            enterTime: new Date(2020, 4, 2, 13, 31, 54),
            exitTime: new Date(2020, 4, 2, 13, 55, 2),
            locationId: 1
        },
        {
            id: 3,
            imei: '990000862471854',
            enterTime: new Date(2020, 3, 28, 11, 43, 12),
            exitTime: new Date(2020, 3, 28, 12, 3, 42),
            locationId: 2
        },
        {
            id: 4,
            imei: '990000862471854',
            enterTime: new Date(2020, 4, 7, 13, 43, 12),
            exitTime: new Date(2020, 4, 7, 14, 3, 42),
            locationId: 1
        },
        {
            id: 5,
            imei: '990000862471854',
            enterTime: new Date(2020, 4, 8, 13, 43, 12),
            exitTime: new Date(2020, 4, 8, 14, 3, 42),
            locationId: 3
        }
    );

    getVisitationsByImei(imei: string): Array<Visitation> {
        return this.items.filter((item) => item.imei === imei);
    }

    getVisitation(id: number): Visitation {
        return this.items.filter((item) => item.id === id)[0];
    }
}
