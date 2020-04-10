import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

    baseUrl = environment.webServerUrl;

    constructor() { }

    getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | Array<string>; } } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic '
        });

    return { headers };
    }

    getApiUrl() {
        return this.baseUrl + 'api/';
    }
}
