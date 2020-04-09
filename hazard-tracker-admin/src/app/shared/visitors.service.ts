import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Visitor { // TODO Put this in a separate file
    id: number;
    imei: string;
    enterTime: Date;
    exitTime: Date;
}

@Injectable({
    providedIn: 'root'
})
export class VisitorsService {

    apiLocation = 'https://www.someapilocation.com/api/';

    constructor(private http: HttpClient) { }

    getVisitors(): Observable<Array<Visitor>> {
        return this.http.get<Array<Visitor>>(this.apiLocation + 'visitors');
    }

    getVisitor(id: number): Observable<Array<Visitor>> {
        return this.http.get<Array<Visitor>>(this.apiLocation + 'visitors/' + id);
    }
}
