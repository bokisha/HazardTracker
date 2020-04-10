import { ConfigurationService } from './configuration.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../shared/location';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    locationApiUrl = this.configurationService.getApiUrl() + 'location/';

    constructor(private http: HttpClient, private configurationService: ConfigurationService) { }

    addLocation(location: Location): Observable<Location> {
        // return this.http.get(this.locationApiUrl, this.configurationService.getRequestHeaders());

        return this.http.post<Location>(this.locationApiUrl,
            location);
    }

    generatePdf(location: Location): Observable<Blob> {
        const httpOptions = {
            headers: new HttpHeaders({
              Accept: 'application/pdf',
              responseType: 'blob'
            })
          };

        return this.http.get<Blob>(this.locationApiUrl + 'generate?id=' + location.id, httpOptions);
    }
}
